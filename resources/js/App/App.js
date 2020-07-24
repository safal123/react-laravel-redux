import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import { history } from "../_helpers";
import store from "../_store";
import { Router, Switch, Redirect, Route } from 'react-router-dom';

import Header from "../_components/Header";
import { Home } from '../HomePage';
import { Login } from "../LoginPage";
import { Register } from "../RegisterPage";
import PrivateRoute from "../_components/PrivateRoute";
import GuestRoute from "../_components/GuestRoute";


function App() {

    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route path={"/"} exact={true} component={Home}/>
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
        <Suspense fallback={'<h1>Loading...</h1>'}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>,
        document.getElementById('app'));
}
