import React from 'react';
import { Alert as AlertMessage } from 'react-bootstrap'
import './Alert.css';

const Alert = ({ alert, clear }) =>{
    if(alert.message){
        return(
            <div className={"container mt-1 border-0"}>
                <AlertMessage variant={"info"} onClose={ () => clear() } dismissible>
                    <AlertMessage.Heading>{alert.message}</AlertMessage.Heading>
                </AlertMessage>
            </div>
        );
    }
    return "";
}

export default Alert;
