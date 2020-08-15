import React, { useEffect } from 'react';
import { history } from "../_helpers";
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from "../_components/Header/Header";
import { Home } from '../HomePage';
import { Login } from "../LoginPage";
import { Register } from "../RegisterPage";
import PrivateRoute from "../_components/Route/PrivateRoute";
import GuestRoute from "../_components/Route/GuestRoute";
import { Cart } from "../Cart";
import { clear } from "../_actions/alert.action";
import Alert from "../_components/Alert/Alert";
import './App.css';


function App({ alert, clear }) {
    useEffect(() => {
        // history.listen((location, action) => {
        //     clear();
        // });
    },[]);

    return (
        <Router history={history}>
            <Header />
            {alert.message &&
                <Alert alert={alert} clear={clear} />
            }
            <Switch>
                <Route path={"/"} exact={true} component={ Home }/>
                <GuestRoute path={"/login"} exact={true} component={ Login }/>
                <GuestRoute path={"/register"} exact={true} component={ Register }/>
                <Route path={"/cart"} exact={true} component={ Cart }/>
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

const mapStateToProps = state =>({
    alert : state.alert,
});

export default connect(mapStateToProps, { clear })(App);


