import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navigacija() {
    const location = useLocation();

    const navbarStyle = {
        backgroundColor: '#345586',
        fontWeight: 'bold',
        padding: '10px 0'
    };

    const navLinkStyle = {
        color: 'white',
        margin: '0 10px'
    };

    const brandStyle = {
        color: 'white',
        marginLeft: '-40px',
        textDecoration: 'none'
    };

    return (
        <Navbar style={navbarStyle} variant="dark" expand="md" className="mb-3">
            <Container>
                <Navbar.Brand className="ms-4">
                    <Link to="/" style={brandStyle}>Student Resources</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/" style={navLinkStyle}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/profile" style={navLinkStyle}>Profile</Nav.Link>
                        <Nav.Link as={Link} to="/subjects" style={navLinkStyle}>Subjects</Nav.Link>
                        <Nav.Link as={Link} to="/login" style={navLinkStyle}>Login</Nav.Link>
                        <Nav.Link as={Link} to="/register" style={navLinkStyle}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigacija;