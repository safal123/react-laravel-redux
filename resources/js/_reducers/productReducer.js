import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAILURE
} from "../_actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCTS_FETCH_REQUEST:
            return{
                isLoading: true
            }
        case PRODUCTS_FETCH_SUCCESS:
            return{
                products: action.payload
            }
        case PRODUCTS_FETCH_FAILURE:
            return{
                error: action.payload
            }
        default:
            return state;
    }
}
