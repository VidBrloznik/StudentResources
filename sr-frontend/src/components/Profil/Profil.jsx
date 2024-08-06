import React, { useContext } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../contexts/contexts';

const Profile = () => {
    const { getUser } = useContext(UserContext);

    if (!getUser) {
        return <div>Loading...</div>;
    }

    const subjects = [
        { id: 1, name: "Programiranje 1" },
        { id: 2, name: "Matematika 2" },
        { id: 3, name: "Algoritmi in podatkovne strukture" }
    ];

    const comments = [
        { id: 1, content: "To je zelo koristno predavanje!" },
        { id: 2, content: "Potrebujemo več primerov." }
    ];

    const materials = [
        { id: 1, title: "Skript za predavanje 1", link: "#" },
        { id: 2, title: "Naloge za domačo nalogo", link: "#" }
    ];

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md="6">
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

                    <Card className="mt-4">
                        <Card.Header as="h5">Predmeti</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {subjects.map(subject => (
                                    <ListGroup.Item key={subject.id}>{subject.name}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header as="h5">Komentarji</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {comments.map(comment => (
                                    <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header as="h5">Gradiva</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {materials.map(material => (
                                    <ListGroup.Item key={material.id}>
                                        <a href={material.link}>{material.title}</a>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
