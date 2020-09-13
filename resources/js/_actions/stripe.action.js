import {stripeService} from "../_services/stripe.service";
import {info, error as alertError} from "./alert.action";
import {history} from "../_helpers";
import {clearCart} from "./cartAction";
import {logout} from "./authActions";

export const checkout = data => {
    return dispatch => {
        stripeService.checkout(data)
            .then(response => {
                dispatch(clearCart());
                dispatch(info("Payment successful. Please check your email."));
            })
            .catch(error => {
                if(error.response.status === 401){
                    dispatch(logout());
                    dispatch(alertError("Unauthenticated."));
                }
            });
    }
}
