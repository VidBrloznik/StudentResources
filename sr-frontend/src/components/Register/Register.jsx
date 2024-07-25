import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

import { API_URL } from "../../utils/utils";

const Register = () => {
    const [formData, setFormData] = useState({
        ime: "",
        priimek: "",
        email: "",
        geslo: "",
        vloga: "",
        fakulteta: ""
    });

    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        try {
            const response = await axios.post(API_URL + '/api/register', formData);
            setAlert({ type: 'success', message: response.data.message });
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            setAlert({ type: 'danger', message: error.response?.data.message || 'Registration failed' });
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>Register</h2>
                    {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formIme">
                            <Form.Label>Ime</Form.Label>
                            <Form.Control
                                type="text"
                                name="ime"
                                value={formData.ime}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPriimek">
                            <Form.Label>Priimek</Form.Label>
                            <Form.Control
                                type="text"
                                name="priimek"
                                value={formData.priimek}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formGeslo">
                            <Form.Label>Geslo</Form.Label>
                            <Form.Control
                                type="password"
                                name="geslo"
                                value={formData.geslo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formVloga">
                            <Form.Label>Vloga</Form.Label>
                            <Form.Control
                                as="select"
                                name="vloga"
                                value={formData.vloga}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="0">Student</option>
                                <option value="1">Professor</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formFakulteta">
                            <Form.Label>Fakulteta</Form.Label>
                            <Form.Control
                                type="text"
                                name="fakulteta"
                                value={formData.fakulteta}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
