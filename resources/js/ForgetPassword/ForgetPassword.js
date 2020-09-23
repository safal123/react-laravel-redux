import React, {useState, Fragment} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {useForm} from "react-hook-form";
import api from "../_helpers/api";

const ForgetPassword = () => {
    const {register, handleSubmit, errors} = useForm();
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onsubmit = (data) => {
        setIsSubmitting(true);
        api().post("/password/email", data)
            .then(response => {
                console.log(response)
                setSuccess(response.data.message);
                setIsSubmitting(false);
                setMessage(null);
            }).catch(error => {
            setIsSubmitting(false);
            setMessage(error.response.data.errors.email);
            setSuccess(null);
            console.log(error.response);
        })
    }
    return (
        <Container>
            <Row className={"justify-content-md-center"}>
                <Col xs={12} md={8} className={"mt-5"}>
                    <Card className={"mt-2 border-info border-1 rounded-0"}>
                        <Card.Header className={"border-1 rounded-0 text-center bg-info text-white"}>
                            <h3>Password Reset</h3>
                        </Card.Header>
                        <Card.Body>
                            {message ?
                                <Alert className={"border-danger rounded-0"} variant={"danger"}>
                                    {message}
                                </Alert> : ''
                            }
                            <Form onSubmit={handleSubmit(onsubmit)}>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        ref={register({required: "Email field is required."})}
                                        type={"email"}
                                        name={"email"}
                                        className={errors.email ? "is-invalid" : ""}
                                        placeholder={"Enter email"}/>
                                    {errors.email &&
                                    <Form.Text className={"text-danger"}>
                                        {errors.email.message}
                                    </Form.Text>
                                    }
                                </Form.Group>
                                {success &&
                                <div className="alert alert-success text-white" role="alert">
                                    {success}
                                </div>
                                }
                                <button className={"btn btn-info"} disabled={isSubmitting}>
                                    {!isSubmitting ? 'Request password reset link.' :
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
                                <Link className="ml-2" to="/login">Back to login</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export {ForgetPassword};
