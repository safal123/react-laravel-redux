import React, {Fragment} from 'react';
import {Spinner} from "react-bootstrap";

const SmallSpinner = ({ text }) => {
    return(
        <Fragment>
            <Spinner
                className={"mr-1"}
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"/>
            {text}
        </Fragment>
    )
}

export default SmallSpinner;
