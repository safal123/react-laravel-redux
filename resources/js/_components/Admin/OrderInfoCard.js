import React, { Fragment } from 'react';
import {Card} from "react-bootstrap";
import SmallSpinner from "../SmallSpinner";
import {Link} from "react-router-dom";

const OrderInfoCard = ({ orders }) => {
    return (
        <Card
            bg={'success'}
            text={'white'}
            style={{width: '18rem'}}
            className="mb-2"
        >
            <Card.Header>Orders</Card.Header>
            <Card.Body>
                <Card.Text>
                    {orders ?
                        <Fragment>
                            <h5>
                                Total no of orders: {orders}
                            </h5>
                            <Link to={'/'} className={'text-white'}>View all orders</Link>
                        </Fragment>
                        :
                        <SmallSpinner text={"Please wait fetching all orders...."}/>
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default OrderInfoCard;
