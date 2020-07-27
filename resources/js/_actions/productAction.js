import { productService } from "../_services/product.service";
import {
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_FAILURE} from "./types";

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
    function request() { return { type: PRODUCT_FETCH_REQUEST } }
    function success(products) { return { type: PRODUCT_FETCH_SUCCESS, payload: products } }
    function failure(error) { return { type: PRODUCT_FETCH_FAILURE, payload: error } }
}

