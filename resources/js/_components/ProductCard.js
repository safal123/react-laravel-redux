import React from 'react';
import { Button, Card } from "react-bootstrap";

const ProductCard = ({ img, title, description }) =>{
    return(
        <Card>
            <Card.Img variant="top" src="https://picsum.photos/100/100" />
            <Card.Body>
                <Card.Title>Iphone 11 Pro Max</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="success" style={{ borderRadius: "0px"}}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
