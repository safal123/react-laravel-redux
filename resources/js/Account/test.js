import React, {useEffect, useState} from "react";
import api from '../_helpers/api';
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {logout} from "../_actions/authActions";
import {connect} from 'react-redux';
import {error as alertError} from "../_actions/alert.action";
import moment from "moment";

const Account = ({logout, alertError}) => {
    const [orders, setOrders] = useState();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                await api().get('/orders').then(response => {
                    setOrders(response.data);
                }).catch(error => {
                    alertError(error.response.statusText);
                    if (error.response.status === 401) {
                        logout();
                    }
                })
            } catch (e) {
                console.log(e);
            }
        };
        fetchOrders();
    }, [])
    if (!orders) {
        return <div className={"homePageSpinner"} style={{
            position: "fixed",
            zIndex: "1000",
        }}>
            <Spinner animation="border"/>
        </div>
    }
    return (
        <div className={"container mt-2"}>
            <div className={"card"}>
                {/*<div className="card-header">*/}
                {/*    You have {orders && orders.length} orders.*/}
                {/*</div>*/}
                <div className="card-body">
                    <div className={"table-responsive-md table-responsive-lg"}>
                        {orders && orders.map(order => (
                            <div key={order.id} className="card border-dark mb-3">
                                <div className="card-header">
                                    Order By: {order.billing_name}
                                    <div className={"float-right"}>
                                        <span className={"text-muted"}>{moment(order.created_at).format("LLL")}</span>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <div className={"d-flex flex-wrap justify-content-between"}>
                                        <div className={""}>
                                            <h5>Order Details</h5>
                                            <span className={"form-text"}>Total Price: ${order.billing_total}</span>
                                            Payment Method: { order.payment_method}
                                        </div>
                                        <div className={""}>
                                            <h5>Billing Details</h5>
                                            <span>Billing Address: { order.billing_address}</span><br/>
                                            <span>Billing Phone: { order.billing_phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        },
        alertError: message => {
            dispatch(alertError(message));
        }
    }
}

const account = connect(null, mapDispatchToProps)(Account)
export {account as Account};
