import React from "react";
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from "../_components/ProductCard";

const Home =() =>{
    return(
        <Container className="mt-2">
            <Row className="justify-content-md-center">
                <Col md={4} lg={4} xs={12} className="p-1">
                    <ProductCard />
                </Col>
                <Col md={4} lg={4} xs={12} className="p-1">
                    <ProductCard />
                </Col>
                <Col md={4} lg={4} xs={12} className="p-1">
                    <ProductCard />
                </Col>
            </Row>
        </Container>
    );
};

// const home = connect(mapStateToProps, mapDispatchToProps)(Home);
// export { home as Home };

export { Home };
