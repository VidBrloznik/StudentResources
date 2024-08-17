import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Dobrodošli na platformi Student Resources</Card.Title>
                            <Card.Text>
                                Student Resources je platforma, zasnovana za pomoč študentom in inštruktorjem pri upravljanju in interakciji z izobraževalnimi gradivi. Ne glede na to, ali želite ustvariti, deliti ali sodelovati pri študijskih materialih, vam stojimo ob strani!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Upravljajte svoj profil</Card.Title>
                            <Card.Text>
                                Posodabljajte svoj profil z najnovejšimi informacijami. Prilagodite svoje nastavitve in enostavno upravljajte svoj račun.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Dostop do študijskih gradiv</Card.Title>
                            <Card.Text>
                                Brskajte in prenašajte študijska gradiva za svoje predmete. Bodite organizirani in na vrhu svojih študijev.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Sodelujte z inštruktorji</Card.Title>
                            <Card.Text>
                                Komunicirajte z inštruktorji, postavljajte vprašanja in pridobite podporo, ki jo potrebujete za uspeh pri svojih predmetih.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Ustvarjajte in delite</Card.Title>
                            <Card.Text>
                                Ustvarite lastna študijska gradiva in jih delite s svojimi vrstniki. Sodelujte in se učite skupaj.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Pridružite se razpravam</Card.Title>
                            <Card.Text>
                                Sodelujte v forumih za razprave in klepetalnicah. Delite ideje, postavljajte vprašanja in se učite od drugih.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Ostanite obveščeni</Card.Title>
                            <Card.Text>
                                Prejemajte najnovejše posodobitve in obvestila od svojih inštruktorjev. Nikoli več ne zamudite pomembnih informacij.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
