import React from 'react';
import { Button } from "react-bootstrap";

const SubmitButton = ({ text, variant }) =>{
    return(
        <Button variant={ variant } type="submit" style={{ borderRadius: "0px"}}>
            { text }
        </Button>
    );
}

export default SubmitButton;
