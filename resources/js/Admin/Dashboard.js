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
    const [search, setSearch] = useState('');
    useEffect(() => {
        allProducts();
    }, []);

    const deleteProduct = (id) => {
        api().delete(`/products/${id}`).then(response => {
            info("Product deleted successfully.");
            setTimeout(()=> allProducts(), 1000);
        }).catch(error => {
            console.log(error.response);
        })
    }

    function filterProducts(data) {
        return data.filter(
            (row) =>
                row.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.id.toString().toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                row.price.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
    }

    return <Fragment>
        <div className={""} style={{backgroundColor: "#e9ecef"}}>
            <div className={"container"}>
                <BreadCrumbs parent={"Admin"} child1={"Dashboard"} clild2={"View"}/>
            </div>
        </div>
        <div className={'container bg-white shadow py-4'}>
            <div className={"d-flex justify-content-between align-items-center"}>
                <ProductInfoCard products={products}/>
                <OrderInfoCard orders={10}/>
                <UserInfoCard users={10}/>
            </div>
            <div className={"card"}>
                <div className={"card-header d-flex justify-content-between align-items-center"}>
                    <div className={'mw-100'}>
                        <form action="">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder={'Search products'}
                                className={'form-control px-2 rounded-0'}/>
                        </form>
                    </div>
                    <Link to={"/products/new"}
                          className={'bg-primary text-white p-1 text-sm text-decoration-none shadow'}>
                        Add New Product</Link>
                </div>
                <div className={"card-body"}>
                    { products ? <ProductTable products={filterProducts(products)} deleteProduct={deleteProduct}/> :
                        <div className={'text-center text-primary'}>
                            <Spinner animation="border" />
                        </div>
                    }
                </div>
            </div>
        </div>
    </Fragment>;
}
const mapStateToProps = state => ({
    products: state.product.products,
});

export default connect(mapStateToProps, {allProducts, info})(Dashboard);
