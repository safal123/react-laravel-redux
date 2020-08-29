import React, { useEffect } from 'react';
import { Alert as AlertMessage } from 'react-bootstrap'
import './Alert.css';

const Alert = ({ alert, clear }) =>{
    useEffect(() => {
        const timer = setTimeout(() => {
            clear();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if(alert.message){
        return(
            <div className={"container mt-1 border-0"}>
                <AlertMessage variant={alert.type} onClose={ () => clear() } dismissible>
                    <AlertMessage.Heading>{alert.message}</AlertMessage.Heading>
                </AlertMessage>
            </div>
        );
    }
    return "";
}

export default Alert;
