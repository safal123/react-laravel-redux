import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    alert: alertReducer
});
