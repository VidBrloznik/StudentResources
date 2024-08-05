import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css';

const predmeti = [
    'Matematika',
    'Fizika',
    'Kemija',
    'Biologija',
    'Zgodovina',
    'Geografija',
    'Računalništvo',
    'Filozofija',
    'Psihologija',
    'Sociologija'
];
const Predmeti = () => {
    return (
        <Container>
            <h2 className="text-center my-4">Predmeti</h2>
            <Row>
                {predmeti.map((predmeti, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="subject-card">
                            <Card.Body>
                                <Card.Title className="text-center">{predmeti}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Predmeti;
