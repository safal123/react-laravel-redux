import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logout} from "../../_actions/authActions";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/all";
import Admin from "./Admin";

const Header = ({auth, logout, cartTotalItems}) => {
    return (
        <Fragment>
            {auth.user && auth.user.email === 'pokharelsafal66@gmail.com' ?
                <Admin/>
                : ''
            }
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <div className="container">
                    <Link className="navbar-brand d-none d-xl-block" to="/">Shop Online</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className={"ml-auto"}/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className={"ml-auto"}>
                            <Link className="nav-link" to="/cart">
                                <FaShoppingCart size={"1rem"}/>
                                <span className="badge badge-danger ml-1">{cartTotalItems}</span>
                            </Link>
                            {!auth.isLoggedIn ?
                                <>
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </>
                                :
                                <>
                                    <NavDropdown title={<FaUser size={"1rem"}/>}>
                                        <Link className="dropdown-item" to="/login" onClick={logout}>Logout</Link>
                                        <NavDropdown.Divider/>
                                        <Link className="dropdown-item" to="/account">Account</Link>
                                    </NavDropdown>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>

        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    cartTotalItems: state.cart.totalItems
})

export default connect(mapStateToProps, {logout})(Header);
