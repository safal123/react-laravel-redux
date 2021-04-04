import React from 'react';

import { FaCartArrowDown } from "react-icons/all";
import { Button, Card } from "react-bootstrap";
import product_image from '../images/product_image.jpeg';

const ProductCard = ({ product, addToCart }) =>{
    return(
        <Card style={{ borderRadius: "1px"}}>
            <Card.Img
                className={"p-2 img-responsive fit-image pointer"}
                variant="top"
                src={product.image_url ?? product_image}
            />
            <Card.Body>
                <Card.Title className={"text-info"}>{product.name}</Card.Title>
                {/*<Card.Text>*/}
                {/*    { product.description.substr(0, 30) } ....*/}
                {/*    <span>*/}
                {/*        <a href="#" className={"text-muted"}>View more</a>*/}
                {/*    </span>*/}
                {/*</Card.Text>*/}
                <div className={"d-flex justify-content-between border-top"}>
                    <Button
                        variant="none"
                        style={{ borderRadius: "0px"}}
                        onClick = { () => addToCart(product.id) }
                    >
                        <FaCartArrowDown size={"2rem"} className={"text-info"}/>
                    </Button>
                    <span className={"m-2 text-info"}> ${ product.price }.00</span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
