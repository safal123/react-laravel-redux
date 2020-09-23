import React, {Fragment, useRef, useState} from 'react';
import {Alert, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import api from "../_helpers/api";
import {useForm} from "react-hook-form";
import {history} from "../_helpers";
import {error as alertError, success as alertSuccess} from "../_actions/alert.action";
import {connect} from "react-redux";

const PasswordReset = (props) => {
    const {register, handleSubmit, errors, watch} = useForm();
    const [message, setMessage] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const password = useRef({});
    password.current = watch("password", "");

    const onsubmit = (data) => {
        setIsSubmitting(true);
        data.token = props.match.params.token;
        api().post("/password/reset", data).then(response => {
            props.alertSuccess(response.data.message);
            setIsSubmitting(false);
            history.push('/login');
        }).catch(error => {
            setIsSubmitting(false);
            setMessage(error.response.data.message);
            props.alertError(error.response.data.message);
        })
    }
    return (
        <Container>
            <Row className={"justify-content-md-center"}>
                <Col xs={12} md={8} className={"mt-5"}>
                    <Card className={"mt-2 border-info border-1 rounded-0"}>
                        <Card.Header className={"border-1 rounded-0 text-center bg-info text-white"}>
                            <h3>Change Password</h3>
                        </Card.Header>
                        <Card.Body>
                            {message ?
                                <Alert className={"border-danger rounded-0"} variant={"danger"}>
                                    {message}
                                </Alert> : ''
                            }
                            <Form onSubmit={handleSubmit(onsubmit)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type={"email"}
                                        name={"email"}
                                        className={errors.email ? "is-invalid" : ""}
                                        ref={register({required: "Email field is required."})}
                                        placeholder={"Enter email"}/>
                                    {errors.email &&
                                    <Form.Text className={"text-danger"}>
                                        {errors.email.message}
                                    </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        name={"password"}
                                        className={errors.password ? "is-invalid" : ""}
                                        ref={register({
                                            required: "Password field is required",
                                            minLength: {value: 8, message: "Password must be eight character long."}
                                        })
                                        }
                                        placeholder={"Password"}/>
                                    {errors.password &&
                                    <Form.Text className={"text-danger"}>
                                        {errors.password.message}
                                    </Form.Text>
                                    }
                                </Form.Group>
                                <Form.Group controlId="formBasicRePassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type={"password"}
                                        name={"password_confirmation"}
                                        className={errors.password_confirmation ? "is-invalid" : ""}
                                        ref={register({validate: value => value === password.current || "The passwords do not match."})}
                                        placeholder={"Confirm password"}/>
                                    {errors.password_confirmation &&
                                    <Form.Text className={"text-danger"}>
                                        {errors.password_confirmation.message}
                                    </Form.Text>
                                    }
                                </Form.Group>
                                <button className={"btn btn-info"} disabled={isSubmitting}>
                                    {!isSubmitting ? 'Change Password.' :
                                        <Fragment>
                                            <Spinner
                                                className={"mr-1"}
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"/>
                                            Please wait..
                                        </Fragment>
                                    }
                                </button>
                                <Link className="ml-2" to="/login">Back to home page</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        alertError: message => {
            dispatch(alertError(message));
        },
        alertSuccess: message =>{
            dispatch(alertSuccess(message))
        }
    }
}
const passwordReset = connect(null, mapDispatchToProps)(PasswordReset)
export {passwordReset as PasswordReset};
