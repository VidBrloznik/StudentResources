import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

const sampleMaterials = {
    1: {
        name: 'Uvod v matematiko',
        description: 'Gradivo za uvod v matematiko.',
        comments: ['Zelo koristno gradivo!', 'Dobro razloženo.'],
        ratings: [5, 4]
    },
    2: {
        name: 'Matematične enačbe',
        description: 'Rešitve matematičnih enačb.',
        comments: ['Pomembno za izpit.', 'Vsebuje veliko napak.'],
        ratings: [3, 2]
    }
};

const Gradivo = () => {
    const { gradivoId } = useParams();
    const material = sampleMaterials[gradivoId];

    if (!material) {
        return (<h2>Gradivo ne obstaja </h2>);
    }

    const averageRating =
        material.ratings.reduce((acc, rating) => acc + rating, 0) /
        material.ratings.length;

    return (
        <Container>
            <Row className="justify-content-center" >
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{material.name} </Card.Title>
                            < Card.Text > {material.description} </Card.Text>
                            < Button variant="primary" className="mb-3" >
                                Prenesi datoteko
                            </Button>
                            < h5 > Komentarji: </h5>
                            {
                                material.comments.map((comment, index) => (
                                    <Card key={index} className="mb-2" >
                                        <Card.Body>{comment} </Card.Body>
                                    </Card>
                                ))
                            }
                            <h5>Povprečna ocena: {averageRating.toFixed(1)} </h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Gradivo;
