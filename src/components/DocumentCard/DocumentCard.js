import React from 'react';
import { Card } from 'react-bootstrap'
import './DocumentCard.scss'

const DocumentCard = (props) => {
    const body = props.body ?? {}
    return (
        <Card bg={props.bg} text={!props.bg ? 'dark' : 'white'}>
            <Card.Header>
                Vaccin n°{body.id}
            </Card.Header>
            <Card.Body>
                <ul>
                    {
                        Object.entries(body).map(([key, value]) => {
                            return <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()} : {JSON.stringify(value)}</li>
                        })
                    }
                </ul>
            </Card.Body>
        </Card>
    );
};

export default DocumentCard;