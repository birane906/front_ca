import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import QrReader from 'react-qr-reader';
import './WebcamPopup.scss'

const WebcamPopup = (props) => {

    const [showModal, setShowModal] = props.showModal;

    const handleScan = data => {
        if (!data) return
        const dataObj = JSON.parse(data);
        if (!("type" in dataObj)) return
        props.procesScan(dataObj)
    }
    const handleError = err => {
        console.error(err)
    }

    return (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title className="w-100">
                    <Row>
                        <Col>
                            <p className="nowrap m-auto">Scannez votre QR Code</p>
                        </Col>
                        <Col className="d-flex">
                            <Button className="ms-auto" variant="danger" onClick={() => setShowModal(false)}>Fermer</Button>
                        </Col>
                    </Row>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <QrReader
                    delay={100}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    facingMode="environment"
                />
            </Modal.Body>
        </Modal>
    );
};

export default WebcamPopup;