import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from "../_actions/authActions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = ({ isLoggedIn, logout }) =>{
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
                            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider />*/}
                            {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                        <Nav>
                            { !isLoggedIn ?
                                <Fragment>
                                    <Link className="nav-link" to="/login">Login</Link>
                                    <Link className="nav-link" to="/register">Register</Link>
                                </Fragment>
                                :
                                <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </Fragment>
    );
}

const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn
})


export default connect(mapStateToProps, { logout })(Header);
