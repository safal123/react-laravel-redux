import React from 'react';
import {Breadcrumb} from "react-bootstrap";

const BreadCrumbs = ({parent, child1, clild2}) =>{
    return(
        <Breadcrumb>
            <Breadcrumb.Item href="#">{parent}</Breadcrumb.Item>
            <Breadcrumb.Item href="">
                {child1}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{clild2}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadCrumbs;
