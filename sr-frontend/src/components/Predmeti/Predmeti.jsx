import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { UserContext } from "../../contexts/contexts";

const Predmeti = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const [alert, setAlert] = useState(null);

    const { getUser } = useContext(UserContext);
    console.log('Trenutni uporabnik:', getUser);
    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/predmeti`, { withCredentials: true });
            console.log("Fetched subjects:", response.data);
            if (response.data.status.success) {
                setSubjects(response.data.data);
            } else {
                setAlert({ type: 'danger', message: response.data.status.msg });
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            setAlert({ type: 'danger', message: 'Error fetching subjects' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleAddSubject = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/predmeti`, {
                Naziv: naziv,
                Opis: opis,
                ProfesorID: getUser.user_id
            }, { withCredentials: true });
            if (response.data.status.success) {
                setAlert({ type: 'success', message: 'Subject added successfully' });
                fetchSubjects();
                handleClose();
            } else {
                setAlert({ type: 'danger', message: response.data.status.msg });
            }
        } catch (error) {
            console.error("Error adding subject:", error);
            setAlert({ type: 'danger', message: 'Error adding subject' });
        }
    };

    return (
        <Container>
            <h2 className="text-center my-4">Predmeti</h2>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
            <Button variant="primary" onClick={handleShow} className="mb-4">
                Dodaj nov predmet
            </Button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Row>
                    {subjects.map((subject, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={2} className="mb-4">
                            <Card className="subject-card">
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        <Link to={`/predmeti/${subject.PredmetID}`}>{subject.Naziv}</Link>
                                    </Card.Title>
                                    <Card.Text>{subject.Opis}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nov predmet</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddSubject}>
                    <Modal.Body>
                        <Form.Group controlId="formNaziv">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Vnesi naziv predmeta"
                                value={naziv}
                                onChange={(e) => setNaziv(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formOpis" className="mt-3">
                            <Form.Label>Opis</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Vnesi opis predmeta"
                                value={opis}
                                onChange={(e) => setOpis(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zapri
                        </Button>
                        <Button variant="primary" type="submit">
                            Shrani
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Predmeti;
