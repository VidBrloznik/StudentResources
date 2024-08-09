import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../utils/utils';

const Gradivo = () => {
    const { gradivoId } = useParams();
    const [material, setMaterial] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await axios.get(`${API_URL}/materials/${gradivoId}`);
                setMaterial(response.data);
            } catch (err) {
                setError('Gradivo ne obstaja');
            }
        };

        fetchMaterial();
    }, [gradivoId]);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!material) {
        return <h2>Nalaganje...</h2>;
    }

    return (
        <Container>
            <h2 className="text-center my-4">Gradivo</h2>
            <Card>
                <Card.Body>
                    <Card.Title>{material.name}</Card.Title>
                    <Card.Text>{material.description}</Card.Text>
                    {/* Display more information about the material as needed */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Gradivo;
