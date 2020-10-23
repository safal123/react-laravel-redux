import React from 'react';

import { FaCartArrowDown } from "react-icons/all";
import { Button, Card } from "react-bootstrap";
import product_image from '../images/product_image.jpeg';

const ProductCard = ({ product, addToCart }) =>{
    return(
        <Card style={{ borderRadius: "0px"}}>
            <Card.Img
                className={"p-2"}
                variant="top"
                src={product_image}
                height={200}
                width={50}
            />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    { product.description.substr(0, 30) } ....
                    <span>
                        <a href="#" className={"text-muted"}>View more</a>
                    </span>
                </Card.Text>
                <div className={"d-flex justify-content-between"}>
                    <Button
                        variant="none"
                        style={{ borderRadius: "0px"}}
                        onClick = { () => addToCart(product.id) }
                    >
                        <FaCartArrowDown size={"2rem"}/>
                    </Button>
                    <span className={"m-2"}>AUD$ { product.price }.00</span>
                </div>

            </Card.Body>
        </Card>
    );
}

export default ProductCard;
