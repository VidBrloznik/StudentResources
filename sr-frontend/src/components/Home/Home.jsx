import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Welcome to Student Resources</Card.Title>
                            <Card.Text>
                                Student Resources is a platform designed to help students and instructors manage and interact with educational materials efficiently. Whether you're looking to create, share, or collaborate on study materials, we've got you covered!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Manage Your Profile</Card.Title>
                            <Card.Text>
                                Keep your profile up-to-date with the latest information. Customize your settings and manage your account with ease.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Access Study Materials</Card.Title>
                            <Card.Text>
                                Browse and download study materials for your courses. Stay organized and on top of your studies.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Engage with Instructors</Card.Title>
                            <Card.Text>
                                Communicate with your instructors, ask questions, and get the support you need to succeed in your courses.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Create and Share</Card.Title>
                            <Card.Text>
                                Create your own study materials and share them with your peers. Collaborate and learn together.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Join Discussions</Card.Title>
                            <Card.Text>
                                Participate in discussion forums and chat rooms. Share ideas, ask questions, and learn from others.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Stay Updated</Card.Title>
                            <Card.Text>
                                Get the latest updates and announcements from your instructors. Never miss important information again.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
