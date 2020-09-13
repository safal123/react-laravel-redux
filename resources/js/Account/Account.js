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
                <div className="card-header">
                    You have {orders && orders.length} orders.
                </div>
                <div className="card-body">
                    <div className={"table-responsive-md table-responsive-lg"}>
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders && orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.billing_name}</td>
                                    <td>{order.billing_email}</td>
                                    <td>{order.billing_address}</td>
                                    <td>
                                        {moment(order.created_at).fromNow()}
                                        <br/>
                                        <span className={"text-muted"}>{moment(order.created_at).format("LLL")}</span>
                                    </td>
                                    <td>${order.billing_total}</td>
                                    <td>Pending</td>
                                    <td>
                                        <Link to={"#"}>View more</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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
