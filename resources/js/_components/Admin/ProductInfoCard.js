import React, {Fragment} from 'react';
import {Card} from "react-bootstrap";
import SmallSpinner from "../SmallSpinner";
import {Link} from "react-router-dom";

const ProductInfoCard = ({products}) => {
    return (
        <Card
            bg={'info'}
            text={'white'}
            style={{width: '18rem'}}
            className="mb-2"
        >
            <Card.Header>Products</Card.Header>
            <Card.Body>
                <Card.Text>
                    {products ?
                        <Fragment>
                            <h5>
                                Total no of products: {products.length}
                            </h5>
                            <Link to={'/'} className={'text-white'}>Go to homepage</Link>
                        </Fragment>
                        :
                        <SmallSpinner text={"Please wait fetching all products...."}/>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ProductInfoCard;
