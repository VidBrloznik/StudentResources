import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Alert, ListGroup, Form } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import { UserContext } from "../../contexts/contexts";

const Predmet = () => {
    const { predmetId } = useParams();
    const [subject, setSubject] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [alert, setAlert] = useState(null); // State to manage alerts
    const [showForm, setShowForm] = useState(false);
    const [naslov, setNaslov] = useState('');
    const [opis, setOpis] = useState('');
    const [tipGradiva, setTipGradiva] = useState('Učbenik');
    const [file, setFile] = useState(null);
    const { getUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Function to fetch subject and materials data
    const fetchSubjectAndMaterials = async () => {
        try {
            const subjectUrl = `${API_URL}/api/predmeti/${predmetId}`;
            const materialsUrl = `${API_URL}/api/predmeti/${predmetId}/gradiva`;

            const [subjectResponse, materialsResponse] = await Promise.all([
                axios.get(subjectUrl, { withCredentials: true }),
                axios.get(materialsUrl, { withCredentials: true })
            ]);

            if (subjectResponse.data.status.success) {
                setSubject(subjectResponse.data.data);
            } else {
                setAlert({ type: 'danger', message: subjectResponse.data.status.msg });
            }

            if (materialsResponse.data.status.success) {
                setMaterials(materialsResponse.data.data);
            } else {
                setAlert({ type: 'danger', message: materialsResponse.data.status.msg });
            }
        } catch (error) {
            console.error("Error fetching subject and materials:", error);
            setAlert({ type: 'danger', message: 'Error fetching subject or materials' });
        }
    };

    useEffect(() => {
        fetchSubjectAndMaterials();
    }, [predmetId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddGradivo = async (e) => {
        e.preventDefault();

        if (!file) {
            setAlert({ type: 'danger', message: "Please select a file." });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tip', file.type);
            formData.append('velikost', file.size);

            // Upload the file and get the DatotekaID
            const fileResponse = await axios.post(`${API_URL}/api/uploads`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            const datotekaId = fileResponse.data.datotekaId;

            // Create the new Gradivo with the necessary details
            const gradivoData = {
                naslov,             // This is the title entered in the form
                opis,               // This is the description entered in the form
                tip: tipGradiva,    // The type selected in the form (e.g., Učbenik, Gradivo, Izpisek)
                datotekaId: datotekaId,         // The ID of the newly created Datoteka
                predmetId: predmetId,          // The ID of the current Predmet
                avtorId: getUser.user_id, // The ID of the currently logged-in user
            };

            // Send a POST request to create the new Gradivo
            await axios.post(`${API_URL}/api/gradiva`, gradivoData, { withCredentials: true });

            setAlert({ type: 'success', message: "Gradivo successfully added!" });

            // Refresh the list of materials
            fetchSubjectAndMaterials();

            // Reset the form
            setNaslov('');
            setOpis('');
            setTipGradiva('Učbenik');
            setFile(null);
            setShowForm(false);
        } catch (error) {
            console.error("Error adding Gradivo:", error);
            setAlert({ type: 'danger', message: "Error adding Gradivo." });
        }
    };

    return (
        <Container>
            <h2 className="text-center my-4">Podrobnosti o predmetu</h2>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
            {subject ? (
                <>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>{subject.Naziv}</Card.Title>
                            <Card.Text>{subject.Opis}</Card.Text>
                            <Button variant="primary" onClick={() => navigate(-1)}>
                                Nazaj
                            </Button>
                        </Card.Body>
                    </Card>

                    <h3 className="my-4">Gradiva</h3>
                    {materials.length > 0 ? (
                        <ListGroup>
                            {materials.map((material, index) => (
                                <ListGroup.Item key={index}>
                                    <Link to={`/gradivo/${material.GradivoID}`}>
                                        {material.Naslov}
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No materials found for this subject.</p>
                    )}

                    <Button variant="success" className="mt-4" onClick={() => setShowForm(!showForm)}>
                        Dodaj Gradivo
                    </Button>

                    {showForm && (
                        <Form onSubmit={handleAddGradivo} className="mt-4">
                            <Form.Group controlId="naslov">
                                <Form.Label>Naslov</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={naslov}
                                    onChange={(e) => setNaslov(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="opis" className="mt-3">
                                <Form.Label>Opis</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={opis}
                                    onChange={(e) => setOpis(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="tipGradiva" className="mt-3">
                                <Form.Label>Tip</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={tipGradiva}
                                    onChange={(e) => setTipGradiva(e.target.value)}
                                >
                                    <option value="Učbenik">Učbenik</option>
                                    <option value="Gradivo">Gradivo</option>
                                    <option value="Izpisek">Izpisek</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="file" className="mt-3">
                                <Form.Label>Izberite datoteko</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-4">
                                Dodaj Gradivo
                            </Button>
                        </Form>
                    )}
                </>
            ) : (
                <p>Loading subject details...</p>
            )}
        </Container>
    );
};

export default Predmet;
