import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DocumentCard } from '../../components/index'
import DocumentApiService from '../../services/api/documentApiService';
import { selectUser } from '../../store/slices/userSlice';

const Vaccine = () => {

    const user = useSelector(selectUser)
    const [vaccines, setVaccines] = useState([])

    useEffect(() => {
        if (process.env.REACT_APP_DEV === "1") {
            const vaccin = {
                id: 185618,
                date: new Date(),
                dose: 1,
        
            }
            return setVaccines([vaccin, vaccin, vaccin, vaccin])
        }
        DocumentApiService.vaccine.getByUserId(user.id)
            .then((vaccinesRep) => {
                setVaccines([...vaccinesRep])
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="m-3">
            <Row className="mb-2 align-items-center">
                <Col>
                    <h1>Mes vaccins</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>
                        <Button className="mx-3" variant="success">Ajouter un vaccin</Button>
                        <Link to="/">
                            <Button variant="primary">Retour à l'accueil</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row >
                {
                    vaccines.map(vaccine => {
                        return (
                            <Col className="mb-3 d-flex justify-content-center" key={vaccine.id} xs={12} md={4} lg={3}>
                                <DocumentCard body={vaccine}></DocumentCard>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    );
};

export default Vaccine;