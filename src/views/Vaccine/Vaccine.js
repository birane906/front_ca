import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DocumentCard, WebcamPopup } from '../../components/index'
import DocumentApiService from '../../services/api/documentApiService';
import { selectUser } from '../../store/slices/userSlice';

const Vaccine = () => {

    const user = useSelector(selectUser)
    const [vaccines, setVaccines] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showValidation, setShowValidation] = useState(false)
    const [vaccine, setVaccine] = useState({})

    useEffect(() => {
        if (process.env.REACT_APP_DEV === "1") {
            const vaccin = {
                id: 185618,
                date: "02/12/2020",
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

    const processVaccine = (dataObj) => {
        setShowModal(false)
        if (dataObj.type !== "vaccine") return 
        delete dataObj.type
        setVaccine(dataObj)
        setShowValidation(true)
    }

    const addVaccine = () => {
        DocumentApiService.vaccine.addVaccine({...vaccine, userId: user.id})
            .then((vaccine) => {
                setVaccines([...vaccines, vaccine])
                setShowValidation(false)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="m-3">
            <Row className="mb-2 align-items-center">
                <Col>
                    <h1>Mes vaccins</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                        <Button className="mx-3" variant="success" onClick={() => setShowModal(true)}>Ajouter un vaccin</Button>
                        <Link to="/">
                            <Button variant="primary" >Retour à l'accueil</Button>
                        </Link>
                </Col>
            </Row>
            <Row >
                {
                    vaccines.map(vaccine => {
                        return (
                            <Col className="mb-3 d-flex justify-content-center" key={vaccine.id} xs={12} md={4} lg={3}>
                                <DocumentCard header="Vaccin" body={vaccine}></DocumentCard>
                            </Col>
                        )
                    })
                }
            </Row>
            <WebcamPopup showModal={[showModal, setShowModal]} procesScan={processVaccine}></WebcamPopup>
            <Modal show={showValidation} onHide={() => setShowValidation(false)}>
                <Modal.Header>
                    <Modal.Title>
                        Nouveau vaccin
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <DocumentCard header="Vaccin" body={vaccine}></DocumentCard>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={addVaccine}>Ajouter</Button>
                    <Button variant="danger" onClick={() => setShowValidation(false)}>Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Vaccine;