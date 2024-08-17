import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Alert, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { UserContext } from "../../contexts/contexts";

const Gradivo = () => {
    const { gradivoId } = useParams();
    const [gradivo, setGradivo] = useState(null);
    const [authorName, setAuthorName] = useState('');
    const [komentarji, setKomentarji] = useState([]);
    const [ocene, setOcene] = useState([]);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState('');
    const [newRatingComment, setNewRatingComment] = useState('');
    const { getUser } = useContext(UserContext);
    const uporabnikID = getUser.user_id;
    const [avtorID, setAvtor] = useState(null);
    const [imeDatoteke, setFileName] = useState('');
    const [datotekaId, setFileID] = useState(null);

    useEffect(() => {
        const fetchGradivo = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/gradiva/${gradivoId}`, { withCredentials: true });
                console.log("Gradivo Response:", response.data);
                if (response.data.status.success) {
                    setGradivo(response.data.data);
                    setAvtor(response.data.data.AvtorID);
                    setFileID(response.data.data.DatotekaID);
                } else {
                    setAlert({ type: 'danger', message: response.data.status.msg });
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

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchGradivo(), fetchKomentarji(), fetchOcene()]);
            setLoading(false);
        };

        fetchData();
    }, [gradivoId]);

    useEffect(() => {
        const fetchFile = async () => {
            if (datotekaId) {
                try {
                    const response = await axios.get(`${API_URL}/api/datoteke/${datotekaId}`, { withCredentials: true });
                    console.log("File Response:", response.data);
                    if (response.data.status.success) {
                        setFileName(response.data.data[0].ImeDatoteke);
                        console.log("File Name:", response.data.data[0].ImeDatoteke);
                    } else {
                        setAlert({ type: 'danger', message: response.data.status.msg });
                    }
                } catch (error) {
                    console.error("Error fetching file:", error);
                    setAlert({ type: 'danger', message: "Error fetching file details." });
                }
            }
        };

        fetchFile();
    }, [datotekaId]);

    useEffect(() => {
        const fetchAuthorName = async () => {
            if (avtorID) {
                try {
                    const authorResponse = await axios.get(`${API_URL}/api/uporabnik/${avtorID}`, { withCredentials: true });
                    console.log("Author Response:", authorResponse.data.data);
                    if (authorResponse.data && authorResponse.data.data && authorResponse.data.data.Ime) {
                        const user = authorResponse.data.data;
                        setAuthorName(user.Ime + " " + user.Priimek);
                    } else {
                        console.warn("Unexpected author response format:", authorResponse.data);
                        setAuthorName("Unknown Author");
                    }
                } catch (error) {
                    console.error("Error fetching author's name:", error);
                    setAuthorName("Unknown Author");
                }
            }
        };

        fetchAuthorName();
    }, [avtorID]);

    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/api/gradiva/${gradivoId}/komentarji/${uporabnikID}`,
                { vsebina: newComment },
                { withCredentials: true }
            );
            console.log("New Comment:", newComment);
            if (response.data && response.data.status && response.data.status.success) {
                setKomentarji([...komentarji, {
                    Vsebina: newComment,
                    CasObjave: new Date(),
                    AvtorID: getUser.userID,
                    KomentarID: response.data.newCommentId
                }]);
                setNewComment('');
                setAlert({ type: 'success', message: 'Comment added successfully!' });
            } else if (response.data && response.data.status) {
                setAlert({ type: 'danger', message: response.data.status.msg });
            } else {
                setAlert({ type: 'danger', message: "Unexpected response format from server." });
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            setAlert({ type: 'danger', message: "Error adding comment." });
        }
    };

    const handleAddRating = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/gradiva/${gradivoId}/ocene/${uporabnikID}`, { ocena: newRating, komentar: newRatingComment }, { withCredentials: true });
            console.log("New Rating:", newRating, "Comment:", newRatingComment);
            if (response.data.status.success) {
                setOcene([...ocene, { Ocena: newRating, Komentar: newRatingComment, AvtorID: uporabnikID, GradivoID: gradivoId }]);
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

    const handleDownload = async () => {
        if (!datotekaId) {
            console.error("No file ID found for download.");
            setAlert({ type: 'danger', message: "No file available for download." });
            return;
        }
        try {
            const response = await axios.get(`${API_URL}/uploads/download/${datotekaId}`, {
                responseType: 'blob',
                withCredentials: true
            });
            console.log("Download Response:", response);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', imeDatoteke || 'file.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error during file download:", error);
            setAlert({ type: 'danger', message: "Error downloading the file." });
        }
    };

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
                            <Card.Text><strong>Opis:</strong> {gradivo.Opis}</Card.Text>
                            <Card.Text><strong>Objavljeno:</strong> {new Date(gradivo.CasObjave).toLocaleDateString()}</Card.Text>
                            <Card.Text><strong>Avtor:</strong> {authorName}</Card.Text>
                            {imeDatoteke && (
                                <Button onClick={handleDownload} variant="primary">
                                    Prenesi datoteko: {imeDatoteke}
                                </Button>
                            )}
                            {!imeDatoteke && <p>Datoteka ni na voljo za prenos.</p>}
                        </Card.Body>
                    </Card>

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
