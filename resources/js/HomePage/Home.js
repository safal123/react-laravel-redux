import React, {useEffect} from "react";
import {connect} from "react-redux";
import {allProducts} from "../_actions/productAction";
import {addToCart} from "../_actions/cartAction";
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import ProductCard from "../_components/ProductCard";
import './HomePage.css';


const Home = ({allProducts, products, addToCart}) => {
    useEffect(() => {
        allProducts();
    }, [])

    if (!products) {
        return <div className={"homePageSpinner"}>
            <Spinner animation="border"/>
        </div>
    }
    return (
        <Container className={"mt-0"}>
            <Row className="">
                {products &&
                products
                    .filter(product => product.is_active)
                    .map(product => (
                    <Col md={4} lg={4} xs={12} className="p-1" key={product.id}>
                        <ProductCard product={product} addToCart={addToCart}/>
                    </Col>
                ))
                }
                <div className={'bg-white shadow w-100 px-2 mx-1 d-flex justify-content-between align-items-center'}>
                    <h4 className={'text-info px-2 py-2 mt-2'}>Latest Products</h4>
                    <h4 className={'text-info px-2 py-2 mt-2'}>View By Category</h4>
                </div>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    products: state.product.products,
});

const home = connect(mapStateToProps, {allProducts, addToCart})(Home);
export {home as Home};

