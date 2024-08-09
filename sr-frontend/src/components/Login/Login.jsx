import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from "../../utils/utils";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../contexts/contexts";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { getUser, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(API_URL + '/auth/prijava', { email, geslo: password }, { withCredentials: true, timeout: 20000 });

            console.log("Login response:", response.data);

            if (response.data.status.success) {
                setUser({
                    loggedIn: true,
                    user_id: response.data.user.UporabnikID,
                    user_name: response.data.user.Ime,
                    user_surname: response.data.user.Priimek,
                    user_email: response.data.user.Email,
                    fakulteta: response.data.user.Fakulteta
                });
                console.log('Trenutni uporabnik:', getUser.user_id);
                navigate('/');
            } else {
                setErrorMessage("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {errorMessage && <p className="text-danger">{errorMessage}</p>}

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
