import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from "../_actions/authActions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/all";

const Header = ({ auth, logout, cartTotalItems }) =>{
    return(
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Shop Online</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Nav.Link href="#products">Products</Nav.Link>*/}
                            {/*<Nav.Link href="#categories">Categories</Nav.Link>*/}
                        </Nav>
                        <Nav>
                            <Link className="nav-link" to="/cart">
                                <FaShoppingCart size={"1rem"}/>
                                <span className="badge badge-danger ml-1">{ cartTotalItems  }</span>
                            </Link>
                            { !auth.isLoggedIn ?
                                <Fragment>
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </Fragment>
                                :
                                <Fragment>
                                    <NavDropdown title={ <FaUser size={"1rem"}/> }>
                                        <Link className="dropdown-item" to="/login" onClick={logout}>Logout</Link>
                                        <NavDropdown.Divider />
                                        <Link className="dropdown-item" to="/profile">Profile</Link>
                                    </NavDropdown>
                                </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </Fragment>
    );
}

const mapStateToProps = state =>({
    // isLoggedIn: state.auth.isLoggedIn,
    auth: state.auth,
    cartTotalItems: state.cart.totalItems
})

export default connect(mapStateToProps, { logout })(Header);
