import React, {Fragment, useEffect, useState} from 'react';

import {connect} from "react-redux";
import {allProducts} from "../_actions/productAction";
import BreadCrumbs from "../_components/BreadCrumbs";
import ProductInfoCard from "../_components/Admin/ProductInfoCard";
import OrderInfoCard from "../_components/Admin/OrderInfoCard";
import ProductTable from "./ProductTable";

const Dashboard = ({products, allProducts}) => {
    // const [newProducts, setNewProducts] = useState();
    useEffect(() => {
        // setTimeout(() => {
            allProducts();
        // }, 500);

    }, []);

    return <Fragment>
        <div className={""} style={{backgroundColor: "#e9ecef"}}>
            <div className={"container"}>
                <BreadCrumbs parent={"Admin"} child1={"Dashboard"} clild2={"View"}/>
            </div>
        </div>
        <div className={'container'}>
            <div className={"d-flex justify-content-between align-items-center"}>
                <ProductInfoCard products={products}/>
                <OrderInfoCard orders={10}/>
                <ProductInfoCard products={products}/>
            </div>
            <div className={"card"}>
                <div className={"card-header"}>
                    All Products
                </div>
                <div className={"card-body"}>
                    <ProductTable products={products}/>
                </div>
            </div>
        </div>
    </Fragment>;
}

const mapStateToProps = state => ({
    products: state.product.products,
});

export default connect(mapStateToProps, {allProducts})(Dashboard);
