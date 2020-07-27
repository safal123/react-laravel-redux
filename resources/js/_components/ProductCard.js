import React from 'react';
import { Button, Card } from "react-bootstrap";

const ProductCard = ({ product }) =>{
    return(
        <Card>
            <Card.Img variant="top" src="https://picsum.photos/100/100" />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    { product.description.substr(0, 30) } ....
                    <span>
                        <a href="#" className={"text-muted"}>View more</a>
                    </span>
                </Card.Text>
                <div className={"d-flex justify-content-between"}>
                    <Button variant="success" style={{ borderRadius: "0px"}}>Add to Cart</Button>
                    <span className={"m-2"}>AUD$ { product.price }.00</span>
                </div>

            </Card.Body>
        </Card>
    );
}

export default ProductCard;
