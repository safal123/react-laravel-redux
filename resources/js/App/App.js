import React, {useEffect} from 'react';
import {history} from "../_helpers";
import {Router, Switch, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from "../_components/Header/Header";
import {Home} from '../HomePage';
import {Login} from "../LoginPage";
import {Register} from "../RegisterPage";
import PrivateRoute from "../_components/Route/PrivateRoute";
import GuestRoute from "../_components/Route/GuestRoute";
import {Cart} from "../Cart";
import {clear} from "../_actions/alert.action";
import Alert from "../_components/Alert/Alert";
import './App.css';
import Checkout from "../Checkout/Checkout";
import {Account} from "../Account";
import {ForgetPassword} from "../ForgetPassword";
import {PasswordReset} from "../PasswordReset";
import Dashboard from "../Admin/Dashboard";
import AdminRoute from "../_components/Route/AdminRoute";
import AddNewProduct from "../Admin/Products/AddNewProduct";
import ErrorPage from "../Error/ErrorPage";
import Index from "../Admin/Products";


function App({alert, clear}) {
    return (
        <Router history={history}>
            {alert.message &&
            <Alert alert={alert} clear={clear}/>
            }
            <Header/>
            <Switch>
                <Route path={"/"} exact={true} component={Home}/>
                <GuestRoute path={"/login"} exact={true} component={Login}/>
                <GuestRoute path={"/register"} exact={true} component={Register}/>
                <GuestRoute path={"/password/email"} exact={true} component={ForgetPassword}/>
                <GuestRoute path={"/reset-password-form/:token?"} exact={true} component={PasswordReset}/>
                <Route path={"/cart"} exact={true} component={Cart}/>
                <Route path={"/response-error"} exact={true} component={ErrorPage}/>
                <PrivateRoute path={"/checkout"} exact={true} component={Checkout}/>
                <PrivateRoute path={"/account"} exact={true} component={Account}/>
                <AdminRoute path={"/admin"} exact={true} component={Dashboard}/>
                <AdminRoute path={"/products"} exact={true} component={Index} />
                <AdminRoute path={"/products/new"} exact={true} component={AddNewProduct} />
                <Redirect from="*" to="/"/>
            </Switch>
        </Router>
    );
}

const mapStateToProps = state => ({
    alert: state.alert,
});

export default connect(mapStateToProps, {clear})(App);


