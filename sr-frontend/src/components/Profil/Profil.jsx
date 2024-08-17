import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/contexts';
import axios from 'axios';
import { API_URL } from '../../utils/utils';

const Profil = () => {
    const { getUser } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const uporabnikID = getUser.user_id;
    useEffect(() => {
        const fetchUserContent = async () => {
            if (!getUser) {
                setLoading(false);
                return;
            }

            try {
                const responseComments = await axios.get(`${API_URL}/api/komentarji/uporabnik/${uporabnikID}`, { withCredentials: true });

                console.log("Komentarji Response:", responseComments.data);
                setComments(responseComments.data.data || []);

                const responseMaterials = await axios.get(`${API_URL}/api/gradiva/uporabnik/${uporabnikID}`, { withCredentials: true });
                console.log("Gradivo Response:", responseMaterials.data);
                setMaterials(responseMaterials.data.data || []);
                console.log(materials);
                console.log(comments);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user content:", error);
                setAlert({ type: 'danger', message: "Error fetching user data." });
                setLoading(false);
            }
        };

        fetchUserContent();
    }, [getUser]);

    if (!getUser) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="6">
                    {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

                    <Card>
                        <Card.Header as="h5">{getUser.vloga === '0' ? 'Študent' : 'Profesor'}</Card.Header>
                        <Card.Body>
                            <Card.Title>{getUser.user_name} {getUser.user_surname}</Card.Title>
                            <Card.Text>
                                <strong>Email: </strong>{getUser.user_email}<br />
                                <strong>Fakulteta: </strong>{getUser.fakulteta}<br />
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    {loading ? (
                        <div className="text-center mt-4">
                            <Spinner animation="border" />
                            <p>Loading user data...</p>
                        </div>
                    ) : (
                        <>
                            <Card className="mt-4">
                                <Card.Header as="h5">Komentarji</Card.Header>
                                <Card.Body>
                                    {comments.length > 0 ? (
                                        <ListGroup variant="flush">
                                            {comments.map((comment, index) => (
                                                <ListGroup.Item key={index}>
                                                    {comment.Vsebina} <br />
                                                    <small className="text-muted">Objavljeno: {new Date(comment.CasObjave).toLocaleString()}</small>
                                                </ListGroup.Item>
                                            ))}

                                        </ListGroup>
                                    ) : (
                                        <p>Ni komentarjev.</p>
                                    )}
                                </Card.Body>
                            </Card>

                            <Card className="mt-4">
                                <Card.Header as="h5">Gradiva</Card.Header>
                                <Card.Body>
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
                                        <p>Ni gradiv.</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Profil;
