import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ProductTable from "../ProductTable";
import {Spinner} from "react-bootstrap";
import api from "../../_helpers/api";
import {connect} from "react-redux";
import {allProducts} from "../../_actions/productAction";
import {info} from "../../_actions/alert.action";
import BreadCrumbs from "../../_components/BreadCrumbs";
import { logout } from "../../_actions/authActions";

const Index = ({products, allProducts, info, logout}) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        allProducts();
    }, []);

    const deleteProduct = (id) => {
        api().delete(`/products/${id}`).then(response => {
            info("Product deleted successfully.");
            setTimeout(() => allProducts(), 1000);
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

    const makeProductActive = async (id) =>{
        setIsLoading(true);
        await api().put(`/products/${id}/make-active`).then(() => {
            info("Product updated successfully.");
            setIsLoading(false);
            allProducts();
        }).catch(error =>{
            setIsLoading(false);
            logout();
            alert(error.message);
        })
    }

    return (
        <div className={'p-1 vh-100 vw-100'}>
            <div className={""} style={{backgroundColor: "#e9ecef"}}>
                <div className={""}>
                    <BreadCrumbs parent={"Admin"} child1={"Products"} clild2={"View"}/>
                </div>
            </div>
            <div className={"card"}>
                <div className={"card-header d-flex justify-content-between align-items-center"}>
                    <div className={'mw-100 d-flex align-items-center'}>
                        <form action="">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder={'Search products'}
                                className={'form-control px-2 rounded-0'}/>
                        </form>
                    </div>
                    <div className={'mw-100 d-flex align-items-center'}>
                        <Link to={'/admin'} className={"mr-2 bg-info text-white p-2 text-sm text-decoration-none shadow"}>View Dashboard</Link>
                        <Link to={"/products/new"}
                              className={'bg-primary text-white p-2 text-sm text-decoration-none shadow'}>
                            Add New Product</Link>
                    </div>
                </div>
                <div className={"card-body"}>
                    {products ?
                        <ProductTable
                          products={filterProducts(products)}
                          deleteProduct={deleteProduct}
                          isLoading={isLoading}
                          makeProductActive={makeProductActive}/> 
                      :
                        <div className={'text-center text-primary vh-100'}>
                            <Spinner animation="border"/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    products: state.product.products,
});

export default connect(mapStateToProps, {allProducts, info, logout})(Index);
