import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearCart, increaseItem, decreaseItem, removeFromCart} from "../_actions/cartAction";
import {Container, Table, Card, Button} from "react-bootstrap";
import {AiFillDelete, FaPlus, FaMinus} from "react-icons/all";
import './Cart.css';

const Cart = ({cart, clearCart, increaseItem, decreaseItem, removeFromCart}) => {
    let i = 1;
    return (
        <Fragment>
            <Container className={"mt-2"}>
                <Card style={{borderRadius: "0px"}}>
                    <Card.Header>
                        Your cart.
                    </Card.Header>
                    <Card.Body>
                        {cart.items.length > 0 ?
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {cart.items && cart.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{i++}</td>
                                        <td>{item.name}</td>
                                        <td>${item.price}.00</td>
                                        <td>
                                            <div className={"d-flex align-items-center"}>
                                                <FaPlus onClick={() => increaseItem(item)} className={"plus"}/>
                                                <span className={"m-1"}>{item.quantity}</span>
                                                <FaMinus onClick={() => decreaseItem(item)}/>
                                            </div>
                                        </td>
                                        <td>
                                            ${item.price * item.quantity}.00
                                        </td>
                                        <td>
                                            <AiFillDelete color={"red"} onClick={() => removeFromCart(item)}/>
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
                        <div className={"d-flex align-items-center"}>
                            <Link to={"/"} className={"btn btn-info"}>Continue
                                Shopping
                            </Link>
                            <Button onClick={() => clearCart()} className={"btn btn-danger"}>
                                <div className={"d-flex align-items-center ml-2"}>
                                    <AiFillDelete/>
                                    <span>Clear Cart</span>
                                </div>
                            </Button>
                            {cart.items.length > 0 &&
                            <Link to={"/checkout"}
                                  className={"ml-1 btn btn-primary ml-lg-auto"}>Checkout</Link>
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

const cart = connect(mapStateToProps, {clearCart, increaseItem, decreaseItem, removeFromCart})(Cart);
export {cart as Cart};
