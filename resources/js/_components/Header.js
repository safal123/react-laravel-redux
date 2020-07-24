import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from "../_actions/authActions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = ({ isLoggedIn, logout, user }) =>{
    return(
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Shop Online</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#products">Products</Nav.Link>
                            <Nav.Link href="#categories">Categories</Nav.Link>
                        </Nav>
                        <Nav>
                            { !isLoggedIn ?
                                <Fragment>
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </Fragment>
                                :
                                <Fragment>
                                    <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
                                    <Link className="nav-link" to="/profile">{ user.email }</Link>
                                    {/*<NavDropdown title={ user.email } id="collasible-nav-dropdown">*/}
                                    {/*    <NavDropdown.Item>*/}
                                    {/*    </NavDropdown.Item>*/}
                                    {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                                    {/*    <NavDropdown.Divider />*/}
                                    {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                                    {/*</NavDropdown>*/}
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
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
})


export default connect(mapStateToProps, { logout })(Header);
