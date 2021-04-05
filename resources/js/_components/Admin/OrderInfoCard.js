import React, {Fragment} from 'react';
import {Card} from "react-bootstrap";
import SmallSpinner from "../SmallSpinner";
import {Link} from "react-router-dom";

const OrderInfoCard = ({orders}) => {
    return (
        <Card
            bg={'success'}
            text={'white'}
            style={{width: '18rem'}}
            className="mb-2 w-100"
        >
            <Card.Header>Orders</Card.Header>
            <Card.Body>
                <Card.Text>
                    {orders ?
                        <Fragment>
                            Total no of orders: {orders} <br/>
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
