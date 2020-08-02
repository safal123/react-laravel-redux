import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';
import {Container, Table, Card} from "react-bootstrap";

const Cart = ({cart}) => {
    const i = 1;
    return (
        <Fragment>
            <Container className={"mt-2"}>
                <Card style={{borderRadius: "0px"}}>
                    <Card.Body>
                        <Card.Title>Your cart.</Card.Title>
                        {cart.items.length > 0 ?
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.items && cart.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{i}</td>
                                        <td>{item.name}</td>
                                        <td>${item.price}.00</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            ${item.price * item.quantity}.00
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td colSpan="3" className={"text-right"}>Total Item Count: {cart.totalItems} items
                                    </td>
                                    <td colSpan="2" className={"text-left"}>Total Amount: ${cart.totalPrice}.00</td>
                                </tr>
                                </tbody>
                            </Table>
                            :
                            <h1>Your cart is empty.</h1>
                        }
                        <div className={"d-flex justify-content-between"}>
                            <Link to={"/"} className={"btn btn-info"} style={{borderRadius: "0px"}}>Continue
                                Shopping</Link>
                            {cart.items.length > 0 &&
                                <Link to={""} className={"btn btn-primary"} style={{borderRadius: "0px"}}>Checkout</Link>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    cart: state.cart
})

const cart = connect(mapStateToProps)(Cart);
export {cart as Cart};
