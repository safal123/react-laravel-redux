import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import { history } from "../_helpers";
import store from "../store";
import { Router, Switch, Redirect, Route } from 'react-router-dom';

import Header from "../components/Header";
import Home from "../HomePage/Home";
import Login from "../LoginPage/Login";
import Register from "../RegisterPage/Register";
import PrivateRoute from "../components/PrivateRoute";
import GuestRoute from "../components/GuestRoute";


function App() {
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <PrivateRoute path={"/"} exact={true} component={Home}/>
                <GuestRoute path={"/login"} exact={true} component={Login}/>
                <GuestRoute path={"/register"} exact={true} component={Register}/>
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app'));
}
