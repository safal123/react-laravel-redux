import { LOGIN, LOGIN_ERROR, LOGOUT, REGISTER, REGISTER_ERROR } from "../_actions/types";

let auth = JSON.parse(localStorage.getItem('auth')) ?? null;
const initialState = auth ? { isLoggedIn: true, user: auth.user } : {}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                isLoggedIn: true,
                user: action.payload
            };
        case LOGIN_ERROR:
            return {
                isLoggedIn: false,
                message: action.payload
            };
        case LOGOUT:
            return {};
        case REGISTER:
            return {
                isLoggedIn: true,
                user: action.payload
            }
        case REGISTER_ERROR:
            return {
                isLoggedIn: false,
                serverErrors: action.payload
            }
        default:
            return state;
    }
}
