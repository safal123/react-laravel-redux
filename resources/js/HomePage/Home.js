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
            <Row className="justify-content-md-center">
                {products &&
                products.map(product => (
                    <Col md={4} lg={4} xs={12} className="p-1" key={product.id}>
                        <ProductCard product={product} addToCart={addToCart}/>
                    </Col>
                ))
                }
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    products: state.product.products,
});

const home = connect(mapStateToProps, {allProducts, addToCart})(Home);
export {home as Home};

