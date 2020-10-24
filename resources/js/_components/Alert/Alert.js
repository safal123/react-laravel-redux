import React, {useEffect} from 'react';
import {Alert as AlertMessage} from 'react-bootstrap'
import './Alert.css';

const Alert = ({alert, clear}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            clear();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (alert.message) {
        return (
            <AlertMessage className={"alertMain fade"} variant={alert.type} onClose={() => clear()} dismissible>
                {alert.message}
            </AlertMessage>
        );
    }
    return "";
}

export default Alert;
