import {
    ADD_TO_CART,
    INCREASE_CART_ITEM,
    DECREASE_CART_ITEM,
    CLEAR_CART,
    REMOVE_CART_ITEM, PRODUCTS_FETCH_REQUEST
} from "./types";

import {productService} from "../_services";
import {success} from "./alert.action";

export const addToCart = (id) => {
    return dispatch => {
        productService.findById(id)
            .then(response => {
                dispatch(addToCart(response.data.product));
                dispatch(success("Product added to cart successfully."));
            })
            .catch(error => {
                console.log(error);
            })

        function addToCart(product) {
            return {type: ADD_TO_CART, payload: product}
        }
    }
}

export const removeFromCart = (product) => {
    return dispatch => {
        dispatch(removeItem(product));
        dispatch(success("Product removed from cart successfully."));
    }

    function removeItem(product) {
        return {type: REMOVE_CART_ITEM, payload: product}
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch(clear());
        dispatch(success("Cart cleared successfully."))
    }

    function clear() {
        return {type: CLEAR_CART, payload: "Your cart is cleared."}
    }
}

export const increaseItem = (product) => {
    return dispatch => {
        dispatch(increase(product));
        dispatch(success(("Product quantity increased successfully.")))
    }

    function increase(product) {
        return {type: INCREASE_CART_ITEM, payload: product}
    }
}

export const decreaseItem = (product) => {
    return dispatch => {
        dispatch(decrease(product));
        dispatch(success(("Product quantity decreased successfully.")))
    }

    function decrease(product) {
        return {type: DECREASE_CART_ITEM, payload: product}
    }
}
