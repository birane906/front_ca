import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DocumentCard, WebcamPopup } from '../../components/index'
import DocumentApiService from '../../services/api/documentApiService';
import { selectUser } from '../../store/slices/userSlice';

const Tests = () => {

    const [tests, setTests] = useState([])
    const [showModal, setShowModal] = useState(false)
    const user = useSelector(selectUser)
    const [showValidation, setShowValidation] = useState(false)
    const [test, setTest] = useState({})

    useEffect(() => {
        if (process.env.REACT_APP_DEV === "1") {
            const testP = {
                id: 185618,
                date: new Date(),
                positive: true,
            }
            const testN = {
                id: 185618,
                date: new Date(),
                positive: false,
            }
            return setTests([testP, testN, testN, testP])
        }
        DocumentApiService.test.getByUserId(user.id)
            .then((testsRep) => {
                setTests([...testsRep])
            })
        // eslint-disable-next-line
    }, [])

    const processTest = (dataObj) => {
        setShowModal(false)
        if (dataObj.type !== "test") return 
        delete dataObj.type
        setTest(dataObj)
        setShowValidation(true)
    }

    const addTest = () => {
        DocumentApiService.test.addTest({...test, userId: user.id})
            .then((test) => {
                setTests([...tests, test])
                setShowValidation(false)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="m-3">
            <Row className="mb-2 align-items-center">
                <Col>
                    <h1>Mes tests</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>
                        <Button className="mx-3" variant="success" onClick={() => setShowModal(true)}>Ajouter un test</Button>
                        <Link to="/">
                            <Button variant="primary">Retour à l'accueil</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row >
                {
                    tests.map(test => {
                        const testBody = {...test}
                        delete testBody.positive
                        return (
                            <Col className="mb-3 d-flex justify-content-center" key={test.id} xs={12} md={4} lg={3}>
                                <DocumentCard header="Test" bg={test.positive ? "danger" : "success"} body={testBody}></DocumentCard>
                            </Col>
                        )
                    })
                }
            </Row>
            <WebcamPopup showModal={[showModal, setShowModal]} procesScan={processTest}></WebcamPopup>
            <Modal show={showValidation} onHide={() => setShowValidation(false)}>
                <Modal.Header>
                    <Modal.Title>
                        Nouveau Test
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    {
                        (() => {
                            const testBody = {...test}
                            delete testBody.positive
                            return <DocumentCard header="Test" bg={test.positive ? "danger" : "success"} body={testBody}></DocumentCard>
                        })()
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={addTest}>Ajouter</Button>
                    <Button variant="danger" onClick={() => setShowValidation(false)}>Annuler</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Tests;