import {authService} from "../_services";

import {LOGIN, LOGIN_ERROR, LOGOUT, REGISTER, REGISTER_ERROR} from "./types";
import {history} from "../_helpers";
import {success as alertSuccess} from "./alert.action";

export const login = data => {
    return dispatch => {
        authService.login(data)
            .then(
                auth => {
                    dispatch(success(auth.user));
                    dispatch(alertSuccess("Logged in successfully."));
                    history.push('/');
                })
            .catch(err => {
                dispatch(error(err.response.data.error));
            });

        function success(user) {
            return {type: LOGIN, payload: user};
        }

        function error(errors) {
            return {type: LOGIN_ERROR, payload: errors};
        }
    };
}

export const socialLogin = data => {
    return dispatch => {
        authService.socialAuthLogin(data)
            .then(
                auth => {
                    dispatch(success(auth.user));
                    dispatch(alertSuccess("Logged in successfully."));
                    history.push('/');
                })
            .catch(err => {
                dispatch(error(err.response.data.error));
            });

        function success(user) {
            return {type: LOGIN, payload: user}
        }

        function error(errors) {
            return {type: LOGIN_ERROR, payload: errors};
        }
    };
}

export const logout = () => {
    authService.logout();
    return {
        type: LOGOUT,
    };

}

export const registerUser = data => dispatch => {
    authService.register(data)
        .then(auth => {
            dispatch(success(auth.user));
            history.push('/');
        })
        .catch(err => {
            dispatch(error(err.response.data.errors));
        });

    function success(user) {
        return {type: REGISTER, payload: user};
    }

    function error(errors) {
        return {type: REGISTER_ERROR, payload: errors};
    }
}
