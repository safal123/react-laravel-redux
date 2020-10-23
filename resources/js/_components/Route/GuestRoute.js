import React from 'react';
import { Route, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        isLoggedIn
            ? <Redirect to={{ pathname: '/' }} />
            : <Component {...props} />
    )} />
)

const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(GuestRoute);
