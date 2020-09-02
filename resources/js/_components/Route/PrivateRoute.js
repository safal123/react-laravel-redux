import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { referer: props.location.pathname } }} />
    )} />
)

const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(PrivateRoute);
