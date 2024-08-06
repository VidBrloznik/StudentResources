import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const sampleData = {
    1: {
        professor: 'Prof. Dr. Janez Novak',
        materials: [
            { id: 1, name: 'Uvod v matematiko', description: 'Gradivo za uvod v matematiko.' },
            { id: 2, name: 'Matematične enačbe', description: 'Rešitve matematičnih enačb.' }
        ]
    },
    // Dodajte podatke za druge predmete tukaj...
};

const Predmet = () => {
    const { predmetId } = useParams();
    const subject = sampleData[predmetId];

    if (!subject) {
        return <h2>Predmet ne obstaja</h2>;
    }

    return (
        <Container>
            <h2 className="text-center my-4">Predmet</h2>
            <h3>Profesor: {subject.professor}</h3>
            <h4 className="mt-4">Gradiva:</h4>
            <Row>
                {subject.materials.map((material) => (
                    <Col key={material.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/gradivo/${material.id}`}>{material.name}</Link>
                                </Card.Title>
                                <Card.Text>{material.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Predmet;
