import React, {Fragment} from 'react';
import {Card} from "react-bootstrap";
import SmallSpinner from "../SmallSpinner";
import {Link} from "react-router-dom";
import {GrAddCircle} from "react-icons/all";

const ProductInfoCard = ({products}) => {
    return (
        <Card
            text={'white'}
            style={{width: '18rem'}}
            className="mb-2 w-100 rounded-0"
        >
            <Card.Header className={"items-center bg-info rounded-0 d-flex align-items-center"}>
                <Link to={'/products'} className={'text-white'}>Products</Link>
                <div className={'ml-auto'}>
                    <Link to={'/products/new'} className={'mr-0'}>
                        <GrAddCircle  className={"bg-white rounded-circle"}/>
                    </Link>
                </div>
            </Card.Header>
            <Card.Body className={"bg-primary"}>
                <Card.Text>
                    {products ?
                        <Fragment>
                            Total no of products: {products.length}
                            <br/>
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
