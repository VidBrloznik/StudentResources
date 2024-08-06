import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const KomentarModal = ({ show, handleClose }) => {
    const [komentar, setKomentar] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tukaj lahko obdelate komentar
        console.log("Komentar:", komentar);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj komentar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formKomentar">
                        <Form.Label>Komentar</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Vnesi komentar"
                            value={komentar}
                            onChange={(e) => setKomentar(e.target.value)}
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

export default KomentarModal;
