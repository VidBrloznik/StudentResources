import React, { useContext } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/contexts";

function Navigacija() {
    const location = useLocation();
    const navigate = useNavigate();
    const { getUser, logout } = useContext(UserContext);
    const user = getUser.user_id;

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

    const handleLogout = () => {
        logout();
        navigate('/login');
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
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profil" style={navLinkStyle}>Profil</Nav.Link>
                                <Nav.Link as={Link} to="/predmeti" style={navLinkStyle}>Predmeti</Nav.Link>
                                <Nav.Link as={Link} onClick={handleLogout} style={navLinkStyle}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" style={navLinkStyle}>Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" style={navLinkStyle}>Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigacija;
