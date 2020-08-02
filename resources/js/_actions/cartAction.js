import {
    ADD_TO_CART,
    INCREASE_CART_ITEM,
    DECREASE_CART_ITEM,
    CLEAR_CART,
    REMOVE_CART_ITEM, PRODUCTS_FETCH_REQUEST
} from "./types";

import { productService } from "../_services";

export const addToCart = (id) => {
    return dispatch => {
        productService.findById(id)
            .then(response =>{
                dispatch(addToCart(response.data.product));
            })
            .catch(error => {
                console.log(error);
            })
        // type: ADD_TO_CART,
        // payload: product
        function addToCart(product) { return { type: ADD_TO_CART, payload: product } }
    }
}

export const removeFromCart = (product) => {
    return {
        type: REMOVE_CART_ITEM,
        payload: product
    }
}

export const clearCart = () => {
    return  {
        type: CLEAR_CART,
        payload: "Your cart is cleared."
    }
}

export const increaseItem = (product) => {
    return {
        type: INCREASE_CART_ITEM,
        payload: product
    }
}

export const decreaseItem = (product) => {
    return {
        type: DECREASE_CART_ITEM,
        payload: product
    }
}
