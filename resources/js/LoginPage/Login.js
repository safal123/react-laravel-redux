import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { login, socialLogin} from "../_actions/authActions";

import {Container, Form, Card, Row, Col, Alert, Spinner} from 'react-bootstrap';
import SubmitButton from "../_components/SubmitButton";
import GoogleLogin from 'react-google-login';


const Login = ({ login, message, socialLogin }) => {
    const { register, handleSubmit, errors } = useForm();

    const onsubmit = (data) =>{
        login(data);
    }
    
    const responseGoogle = (response) => {
        const token =  response.tokenObj.id_token
        const data = { token };
        socialLogin(data);
    }

    const responseGoogleFailure = response =>{
        console.log(response);
    }

    return(
        <Container>
            <Row className={"justify-content-md-center"}>
                <Col xs={12} md={8} className={"mt-5"}>
                    <Card className={"mt-2 border-info border-1 rounded-0"}>
                        <Card.Header className={"border-1 rounded-0 text-center bg-info text-white"}>
                            <h3>Login Form</h3>
                        </Card.Header>
                        <Card.Body>
                            { message ?
                                <Alert className={"border-danger rounded-0"} variant={"danger"}>
                                    { message }
                                </Alert> : ''
                            }
                            <Form onSubmit={handleSubmit(onsubmit)}>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        ref={register({ required: "Email field is required." })}
                                        type={"email"}
                                        name={"email"}
                                        className={ errors.email ? "is-invalid" :  ""}
                                        placeholder={"Enter email"}/>
                                    { errors.email &&
                                    <Form.Text className={"text-danger"}>
                                        { errors.email.message }
                                    </Form.Text>
                                    }
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        ref={register({ required: "Password field is required." })}
                                        name={"password"}
                                        type={"password"}
                                        className={ errors.password ? "is-invalid" :  ""}
                                        placeholder={"Password"} />
                                    { errors.password &&
                                    <Form.Text className={"text-danger"}>
                                        { errors.password.message }
                                    </Form.Text>
                                    }
                                </Form.Group>
                                <SubmitButton text={"Login"} variant={"info"}/>
                                <Link className="ml-2" to="/register">New user?</Link>
                                <Link className="ml-4" to="/register">Forget password?</Link>
                            </Form>
                            <Row className={""}>
                                <Col className={"mt-2 d-flex justify-content-center"}>
                                    <GoogleLogin
                                        clientId="514255409927-am5hie4sqpfgdi63eufslf1dskickej5.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogleFailure}
                                        cookiePolicy={'single_host_origin'}
                                        // isSignedIn={true}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state =>({
    message : state.auth.message,
});

const loginPage = connect(mapStateToProps, { login, socialLogin })(Login);

export { loginPage as Login };
