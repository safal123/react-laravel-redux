import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

export default combineReducers({
    auth: authReducer,
    product: productReducer
});
