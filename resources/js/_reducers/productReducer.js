import {
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_FAILURE} from "../_actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_FETCH_REQUEST:
            return{
                isLoading: true
            }
        case PRODUCT_FETCH_SUCCESS:
            return{
                products: action.payload
            }
        case PRODUCT_FETCH_FAILURE:
            return{
                error: action.payload
            }
        default:
            return state;
    }
}
