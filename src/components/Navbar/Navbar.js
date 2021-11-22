import React from 'react';
import { Navbar as Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import covidImg from '../../assets/images/covid.svg'

const Navbar = (props) => {
    return (
        <Nav bg="dark" variant="dark">
            <Container>
                <Nav.Brand as={Link} to="/home">
                    <img
                        alt=""
                        src={covidImg}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Covid Alert
                </Nav.Brand>
                <Nav.Toggle></Nav.Toggle>
                <Nav.Collapse className="justify-content-end">
                    <Nav.Text>
                        Connecté : {props.user}
                    </Nav.Text>
                </Nav.Collapse>
            </Container>
        </Nav>
    );
};

export default Navbar;