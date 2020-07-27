import React, {useEffect} from "react";
import {connect} from "react-redux";

import { allProducts } from "../_actions/productAction";

import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from "../_components/ProductCard";



const Home = ({ allProducts, products }) =>{
    useEffect( () =>{
        allProducts();
    }, [])
    return(
        <Container className="mt-2">
            <Row className="justify-content-md-center">
                { products ?
                    products.map(product =>(
                        <Col md={4} lg={4} xs={12} className="p-1" key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                :
                <div>Loading please wait...</div>}
            </Row>
        </Container>
    );
};

const mapStateToProps = state =>({
    products : state.product.products,
});

const home = connect(mapStateToProps, { allProducts })(Home);
export { home as Home };

