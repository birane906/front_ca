import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DocumentCard } from '../../components/index'
import DocumentApiService from '../../services/api/documentApiService';
import { selectUser } from '../../store/slices/userSlice';

const Tests = () => {

    const user = useSelector(selectUser)
    const [tests, setTests] = useState([])

    useEffect(() => {
        if (process.env.REACT_APP_DEV === "1") {
            const testP = {
                id: 185618,
                date: new Date(),
                dose: 1,
                positive: true,
            }
            const testN = {
                id: 185618,
                date: new Date(),
                dose: 1,
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

    return (
        <div className="m-3">
            <Row className="mb-2 align-items-center">
                <Col>
                    <h1>Mes tests</h1>
                </Col>
                <Col className="d-flex justify-content-end">
                    <div>
                        <Button className="mx-3" variant="success">Ajouter un test</Button>
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
                                <DocumentCard bg={test.positive ? "danger" : "success"} body={testBody}></DocumentCard>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    );
};

export default Tests;