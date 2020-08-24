import React, {useState, Fragment, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Form, Spinner} from "react-bootstrap";

const CheckoutForm = ({auth, cart}) => {
    const {register, handleSubmit, errors} = useForm();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const {name, email} = auth.user;

    const onSubmit = async (data) => {
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            console.log(error);
            setError(error.message);
        } else {
            setError(null);
            paymentMethod.billing_details = {
                "email": data.email,
                "address": data.address,
                "name": data.name,
                "phone": data.phone
            };
            paymentMethod.metadata = cart;
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(false);
    }

    return (
        <div className="card">
            <div className="card-header">
                Checkout
            </div>
            <div className="card-body">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type={"text"}
                            name={"name"}
                            readOnly={name ? true : false}
                            defaultValue={name}
                            className={errors.name ? "is-invalid" : ""}
                            aria-invalid={errors.name ? "true" : "false"}
                            ref={register({required: "Name field is required."})}
                            placeholder={"Enter your full name."}/>
                        {errors.name &&
                        <Form.Text className={"text-danger"}>
                            {errors.name.message}
                        </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type={"email"}
                            name={"email"}
                            readOnly={email ? true : false}
                            defaultValue={email}
                            className={errors.email ? "is-invalid" : ""}
                            aria-invalid={errors.email ? "true" : "false"}
                            ref={register({required: "Email field is required."})}
                            placeholder={"Enter your email address."}/>
                        {errors.email &&
                        <Form.Text className={"text-danger"}>
                            {errors.email.message}
                        </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type={"text"}
                            name={"phone"}
                            className={errors.phone ? "is-invalid" : ""}
                            aria-invalid={errors.phone ? "true" : "false"}
                            ref={register({required: "Phone number is required."})}
                            placeholder={"Enter your phone number."}/>
                        {errors.phone &&
                        <Form.Text className={"text-danger"}>
                            {errors.phone.message}
                        </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Postal Address</Form.Label>
                        <Form.Control
                            type={"text"}
                            name={"address"}
                            className={errors.address ? "is-invalid" : ""}
                            aria-invalid={errors.address ? "true" : "false"}
                            ref={register({required: "Postal address is required."})}
                            placeholder={"Enter your postal address"}/>
                        {errors.address &&
                        <Form.Text className={"text-danger"}>
                            {errors.address.message}
                        </Form.Text>
                        }
                    </Form.Group>

                    <Form.Group>
                        <h3>Card Information</h3>
                        <fieldset className={"m-0 border p-4"}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            border: '10px',
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </fieldset>
                        {error &&
                        <Form.Text className={"text-danger"}>
                            {error}
                        </Form.Text>
                        }
                    </Form.Group>
                    <button className={"btn btn-info"} disabled={!stripe || processing}>
                        {processing ?
                            <Fragment>
                                <Spinner
                                    className={"mr-1"}
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"/>
                                Please wait...
                            </Fragment>
                            :
                            <Fragment>
                                Checkout
                            </Fragment>
                        }
                    </button>
                </Form>
            </div>
        </div>
    );
}

export default CheckoutForm;
