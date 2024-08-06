import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const OcenaModal = ({ show, handleClose }) => {
    const [ocena, setOcena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Ocena:", ocena);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj oceno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formOcena">
                        <Form.Label>Ocena</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Vnesi oceno"
                            value={ocena}
                            onChange={(e) => setOcena(e.target.value)}
                            min="1"
                            max="10"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Dodaj
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default OcenaModal;
