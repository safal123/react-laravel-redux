import React, {useRef} from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import { registerUser } from "../actions/authActions";
import { Card, Col, Container, Form, Row} from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";


const Register = ({ registerUser, serverErrors }) =>{
    const { register, handleSubmit, errors, watch } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data =>{
        registerUser(data);
    }


    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} className={"mt-5"}>
                    <Card className="mt-2 border-info border-1 rounded-0">
                        <Card.Header className={" border-1 rounded-0 text-center bg-info text-white"}>
                            <h3>Register</h3>
                        </Card.Header>
                        <Card.Body>

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="formBasicFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        name={"name"}
                                        className={ errors.name ? "is-invalid" :  ""}
                                        aria-invalid={errors.name ? "true" : "false"}
                                        ref={register({ required: "Name field is required." })}
                                        placeholder={"Enter your full name"}/>
                                    { errors.name &&
                                        <Form.Text className={"text-danger"}>
                                            { errors.name.message }
                                        </Form.Text>
                                    }
                                    { serverErrors &&
                                    <Form.Text className={"text-danger"}>
                                        { serverErrors.name }
                                    </Form.Text>
                                    }
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type={"email"}
                                        name={"email"}
                                        className={ errors.email ? "is-invalid" :  ""}
                                        ref={register({ required: "Email field is required." })}
                                        placeholder={"Enter email"}/>
                                    { errors.email &&
                                        <Form.Text className={"text-danger"}>
                                            { errors.email.message }
                                        </Form.Text>
                                    }
                                    { serverErrors &&
                                    <Form.Text className={"text-danger"}>
                                        { serverErrors.email }
                                    </Form.Text>
                                    }
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        name={"password"}
                                        className={ errors.password ? "is-invalid" :  ""}
                                        ref={ register({
                                                required: "Password field is required",
                                                minLength: { value: 5, message: "Password must be five character long."}
                                                })
                                            }
                                        placeholder={"Password"} />
                                    { errors.password &&
                                        <Form.Text className={"text-danger"}>
                                            { errors.password.message }
                                        </Form.Text>
                                    }
                                    { serverErrors &&
                                    <Form.Text className={"text-danger"}>
                                        { serverErrors.password }
                                    </Form.Text>
                                    }
                                </Form.Group>

                                <Form.Group controlId="formBasicRePassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        name={"password_confirmation"}
                                        className={ errors.password_confirmation ? "is-invalid" :  ""}
                                        ref={register({ validate: value => value === password.current || "The passwords do not match."})}
                                        placeholder={"Confirm password"} />
                                    { errors.password_confirmation &&
                                        <Form.Text className={"text-danger"} >
                                            { errors.password_confirmation.message }
                                        </Form.Text>
                                    }
                                    { serverErrors &&
                                    <Form.Text className={"text-danger"}>
                                        { serverErrors.password_confirmation }
                                    </Form.Text>
                                    }
                                </Form.Group>
                                <SubmitButton text={"Register"} variant={"info"}/>
                                <Link className="ml-4" to="/login">Already have an account?</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state =>({
    serverErrors : state.auth.serverErrors,
})

export default connect(mapStateToProps, { registerUser })(Register);
