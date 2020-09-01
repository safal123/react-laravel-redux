import React from "react";
import {Spinner as ReactSpinner} from "react-bootstrap";

const Spinner = () => {
    return (
        <div className={"homePageSpinner"}>
            <ReactSpinner animation="border"/>
        </div>
    )
}
export default Spinner;
