import { productService } from "../_services";

import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAILURE} from "./types";

export const allProducts = ()  =>{
    return dispatch => {
        dispatch(request());
        productService.all()
            .then( response =>{
                dispatch(success(response.data.products));
            })
            .catch( error =>{
                dispatch(failure(error.response.data.errors));
                //dispatch alert actions
        });
    };
    function request() { return { type: PRODUCTS_FETCH_REQUEST } }
    function success(products) { return { type: PRODUCTS_FETCH_SUCCESS, payload: products } }
    function failure(error) { return { type: PRODUCTS_FETCH_FAILURE, payload: error } }
}

