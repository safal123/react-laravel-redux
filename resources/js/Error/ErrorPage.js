import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {logout} from "../_actions/authActions";
import {history} from "../_helpers";

const ErrorPage = ({ logout }) => {
    useEffect(() =>{
        if(!localStorage.getItem('auth')){
            return history.push('/login');
        }
        logout();
        // history.push('/login');
    }, [])

    return (
        <div className={'container'}>
            <div className={'card'}>
                <div className={'card-header'}>
                    Something went wrong
                </div>
                <div className={'card-body'}>
                    <h1>Something went wrong.</h1>
                </div>
            </div>
        </div>
    );
}

export default connect(null, {logout})(ErrorPage);
