import React, {useEffect, useState} from "react";
import api from '../_helpers/api';
import {Link} from "react-router-dom";
import Spinner from "../_components/Spinner/Spinner";

const Account = () => {
    const [orders, setOrders] = useState();
    useEffect(() => {
        api().get('/orders').then(response => {
            setOrders(response.data);
        })
    }, [])
    return (
        <div className={"container mt-2"}>
            <div className={"card"}>
                <div className="card-header">
                    You have { orders && orders.length } orders.
                </div>
                <div className="card-body">
                    { !orders ? <Spinner /> : ""}
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
                                <td>{order.created_at}</td>
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
    );
}

export {Account};
