import React, {Fragment, useEffect, useState} from 'react';

import {connect} from "react-redux";
import {allProducts} from "../_actions/productAction";
import BreadCrumbs from "../_components/BreadCrumbs";
import ProductInfoCard from "../_components/Admin/ProductInfoCard";
import OrderInfoCard from "../_components/Admin/OrderInfoCard";
import ProductTable from "./ProductTable";
import UserInfoCard from "../_components/Admin/UserInfoCard";
import {Link} from "react-router-dom";
import api from "../_helpers/api";
import {info} from "../_actions/alert.action";
import {Spinner} from "react-bootstrap";

const Dashboard = ({products, allProducts, info}) => {
    useEffect(() => {
        allProducts();
    }, []);

    return <Fragment>
        <div className={"mb-0"}>
            <div className={""}>
                <BreadCrumbs parent={"Admin"} child1={"Dashboard"}/>
            </div>
        </div>
        <div className="row">
            <div className={'col-md-8'}>
                <div className="card">
                    <div className="card-header">
                        View Status
                    </div>
                    <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, atque debitis dolor ea eos
                        facere inventore itaque magnam maiores, molestias nostrum perspiciatis sapiente temporibus ullam
                        ut? Dolorem nam officia saepe?
                    </div>
                </div>
            </div>
            <div className={'col-md-4'}>
                <div className={"d-flex flex-column justify-content-between"}>
                    <ProductInfoCard products={products}/>
                    <OrderInfoCard orders={10}/>
                    <UserInfoCard users={10}/>
                </div>
            </div>
        </div>
    </Fragment>;
}
const mapStateToProps = state => ({
    products: state.product.products,
});

export default connect(mapStateToProps, {allProducts, info})(Dashboard);
