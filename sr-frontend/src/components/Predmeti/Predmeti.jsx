import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const subjects = [
    { id: 1, name: 'Matematika' },
    { id: 2, name: 'Fizika' },
    { id: 3, name: 'Kemija' },
    { id: 4, name: 'Biologija' },
    { id: 5, name: 'Zgodovina' },
    { id: 6, name: 'Geografija' },
    { id: 7, name: 'Računalništvo' },
    { id: 8, name: 'Filozofija' },
    { id: 9, name: 'Psihologija' },
    { id: 10, name: 'Sociologija' }
];

const Predmeti = () => {
    return (
        <Container>
            <h2 className="text-center my-4">Predmeti</h2>
            <Row>
                {subjects.map((subject, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={2} className="mb-4">
                        <Card className="subject-card">
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <Link to={`/predmeti/${subject.id}`}>{subject.name}</Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Predmeti;
