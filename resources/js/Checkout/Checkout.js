import React from 'react';
import {connect} from 'react-redux';
import CheckoutForm from "./CheckoutForm";
import {history} from "../_helpers";
import {checkout} from "../_actions/stripe.action";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const CheckOut = ({auth, cart, checkout}) => {
    const stripePromise =
        loadStripe('pk_test_518Esm8GsMDeNFoLETBXT3RWv5F3Wc5i91mEwaykIrYRbgSudhtXuOXjWB8DdjfVzNgqqwJokzgVWX5DujHKpXBJc00gwm7XBWw');
    const {items} = cart;
    if (items.length === 0) {
        history.push('/');
    }

    return (
        <div className={"container mt-2"}>
            <div className={"row"}>
                <div className={"col-md-8 col-sm-12"}>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm auth={auth} cart={cart} checkout={checkout}/>
                    </Elements>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            Your Order details
                        </div>
                        <div className="card-body">
                            {cart && items.map(item =>
                                <div key={item.id} className={"cart-items"}>
                                    {item.name} {item.quantity}*{item.price} = ${item.quantity * item.price}
                                </div>
                            )}
                            <div className={"cart-total"}>Total Price: ${cart.totalPrice}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
});

export default connect(mapStateToProps, {checkout})(CheckOut);
