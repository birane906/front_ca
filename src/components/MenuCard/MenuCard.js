import React from 'react';
import { Card } from 'react-bootstrap';
import './MenuCard.scss'

const MenuCard = (props) => {
    return (
        <Card {...props}>
            <Card.Header>
                <Card.Title>{props.title}</Card.Title>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                {
                    props.imagesrc &&
                    <Card.Img className="p-5" alt={`Menu Card ${props.title}`} src={props.imagesrc}></Card.Img>
                }
                {props.children}
            </Card.Body>
        </Card>
    );
};

export default MenuCard;