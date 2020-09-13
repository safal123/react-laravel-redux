import React, {useState, Fragment, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import {Form, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {history} from "../_helpers";
import api from "../_helpers/api";

const CheckoutForm = ({auth, cart, clearCart, info}) => {
    const {register, handleSubmit, errors} = useForm();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [name, setName] = useState(auth.user ? auth.user.name : null)
    const [email, setEmail] = useState(auth.user ? auth.user.email : null)

    const onSubmit = async (data) => {
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const cardElement = elements.getElement(CardElement);
        const {token, error} = await stripe.createToken(cardElement);
        if (error) {
            setProcessing(false);
            setError(error.message);
        } else {
            setError(null);
            token.billing_details = {
                "email": data.email,
                "address": data.address,
                "name": data.name,
                "phone": data.phone
            };
            token.cart = cart;
            await api().post('/checkout', token).then(response =>{
                console.log(response);
                if(response.status === 200){
                    setProcessing(false);
                    info("Payment successful. Please check your email.")
                    history.push('/account');
                }
            }).catch(error =>{
                console.log(error);
            })
        }
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
                    <button className={"btn btn-primary"} disabled={!stripe || processing}>
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
                                Pay now
                            </Fragment>
                        }
                    </button>
                    <Link to={"/"} className={"btn btn-info mr-1 ml-1"}>Continue
                        Shopping
                    </Link>
                    <Link to={"/cart"} className={"btn btn-success mr-1 ml-1"}>View Cart
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default CheckoutForm;
