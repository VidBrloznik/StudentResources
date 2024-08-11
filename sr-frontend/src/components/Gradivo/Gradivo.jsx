import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Alert, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../utils/utils";

const Gradivo = () => {
    const { gradivoId } = useParams();
    const [gradivo, setGradivo] = useState(null);
    const [komentarji, setKomentarji] = useState([]);
    const [ocene, setOcene] = useState([]);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState('');
    const [newRatingComment, setNewRatingComment] = useState('');

    useEffect(() => {
        const fetchGradivo = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/gradiva/${gradivoId}`, { withCredentials: true });
                console.log("Gradivo Response:", response.data);
                if (response.data.status && response.data.status.success) {
                    setGradivo(response.data);
                } else {
                    setAlert({ type: 'danger', message: response.data.status ? response.data.status.msg : "Unknown error." });
                }
            } catch (error) {
                console.error("Error fetching gradivo:", error);
                setAlert({ type: 'danger', message: "Error fetching gradivo details." });
            }
        };

        const fetchKomentarji = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/komentarji/${gradivoId}`, { withCredentials: true });
                console.log("Komentarji Response:", response.data.data);
                if (response.data && Array.isArray(response.data.data)) {
                    setKomentarji(response.data.data);
                } else {
                    setAlert({ type: 'danger', message: "Unexpected data format for komentarji." });
                }
            } catch (error) {
                console.error("Error fetching komentarji:", error);
                setAlert({ type: 'danger', message: "Error fetching komentarji." });
            }
        };

        const fetchOcene = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/ocene/${gradivoId}`, { withCredentials: true });
                console.log("Ocene Response:", response.data.data);
                if (response.data && Array.isArray(response.data.data)) {
                    setOcene(response.data.data);
                } else {
                    setAlert({ type: 'danger', message: "Unexpected data format for ocene." });
                }
            } catch (error) {
                console.error("Error fetching ocene:", error);
                setAlert({ type: 'danger', message: "Error fetching ocene." });
            }
        };

        // Fetch all data concurrently
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchGradivo(), fetchKomentarji(), fetchOcene()]);
            setLoading(false);
        };

        fetchData();
    }, [gradivoId]);

    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/gradiva/${gradivoId}/komentarji`, { vsebina: newComment }, { withCredentials: true });
            if (response.data.status.success) {
                setKomentarji([...komentarji, { Vsebina: newComment, CasObjave: new Date(), AvtorID: response.data.userId, KomentarID: response.data.newCommentId }]);
                setNewComment('');
                setAlert({ type: 'success', message: 'Comment added successfully!' });
            } else {
                setAlert({ type: 'danger', message: response.data.status.msg });
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            setAlert({ type: 'danger', message: "Error adding comment." });
        }
    };

    const handleAddRating = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/gradiva/${gradivoId}/ocene`, { ocena: newRating, komentar: newRatingComment }, { withCredentials: true });
            if (response.data.status.success) {
                setOcene([...ocene, { Ocena: newRating, Komentar: newRatingComment, AvtorID: response.data.userId, OcenaID: response.data.newRatingId }]);
                setNewRating('');
                setNewRatingComment('');
                setAlert({ type: 'success', message: 'Rating added successfully!' });
            } else {
                setAlert({ type: 'danger', message: response.data.status.msg });
            }
        } catch (error) {
            console.error("Error adding rating:", error);
            setAlert({ type: 'danger', message: "Error adding rating." });
        }
    };

    const getDownloadUrl = (datotekaId) => `${API_URL}/datoteke/download/${datotekaId}`;

    return (
        <Container>
            <h2 className="text-center my-4">Podrobnosti o Gradivu</h2>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Loading gradivo details...</p>
                </div>
            ) : gradivo ? (
                <>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>{gradivo.Naslov}</Card.Title>
                            <Card.Text><strong>Avtor:</strong> {gradivo.AvtorID}</Card.Text>
                            <Card.Text>{gradivo.Opis}</Card.Text>
                            <a
                                href={getDownloadUrl(gradivo.DatotekaID)}
                                className="btn btn-primary"
                                download
                            >
                                Prenesi Datoteko
                            </a>
                        </Card.Body>
                    </Card>

                    {/* Komentarji Section */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Komentarji</Card.Title>
                            {komentarji.length > 0 ? (
                                komentarji.map((komentar) => (
                                    <div key={komentar.KomentarID} className="mb-3">
                                        <Card.Text><strong>Avtor:</strong> {komentar.AvtorID}</Card.Text>
                                        <Card.Text><strong>Čas Objave:</strong> {new Date(komentar.CasObjave).toLocaleString()}</Card.Text>
                                        <Card.Text>{komentar.Vsebina}</Card.Text>
                                    </div>
                                ))
                            ) : (
                                <p>Ni komentarjev.</p>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Add Comment Form */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Dodaj Nov Komentar</Card.Title>
                            <Form onSubmit={handleAddComment}>
                                <Form.Group controlId="commentContent">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Vnesite vaš komentar"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Nov Komentar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Ocene Section */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Ocene</Card.Title>
                            {ocene.length > 0 ? (
                                ocene.map((ocena) => (
                                    <div key={ocena.OcenaID} className="mb-3">
                                        <Card.Text><strong>Ocena:</strong> {ocena.Ocena}</Card.Text>
                                        <Card.Text>{ocena.Komentar}</Card.Text>
                                        <Card.Text><strong>Avtor:</strong> {ocena.AvtorID}</Card.Text>
                                    </div>
                                ))
                            ) : (
                                <p>Ni ocen.</p>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Add Rating Form */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Dodaj Novo Oceno</Card.Title>
                            <Form onSubmit={handleAddRating}>
                                <Form.Group controlId="ratingValue">
                                    <Form.Label>Ocena (1-5)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={newRating}
                                        onChange={(e) => setNewRating(e.target.value)}
                                        placeholder="Vnesite oceno (1-5)"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="ratingComment">
                                    <Form.Label>Komentar (neobvezno)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={newRatingComment}
                                        onChange={(e) => setNewRatingComment(e.target.value)}
                                        placeholder="Dodatni komentar"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Nova Ocena
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <p>Gradivo ni bilo mogoče naložiti.</p>
            )}
        </Container>
    );
};

export default Gradivo;
