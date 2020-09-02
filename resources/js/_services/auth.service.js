import api from "../_helpers/api";
import {history} from "../_helpers";

export const authService = {
    login,
    logout,
    register,
    socialAuthLogin,
};


function login(data) {
    return api().post('/login', data)
        .then(response => {
            return setUserInfo(response);
        });
}

function logout() {
    return api().post('/logout')
        .then(() => {
            localStorage.removeItem('auth');
        }).catch(error => {
            localStorage.removeItem('auth');
        })
}

function register(data) {
    return api().post('/register', data)
        .then(response => {
            return setUserInfo(response);
        })
}

function socialAuthLogin(data) {
    return api().post('/login/google', data)
        .then(response => {
            return setUserInfo(response);
        })
}

function setUserInfo(response) {
    const auth = response.data.success
    // Store user and token to local storage
    localStorage.setItem('auth', JSON.stringify(auth))
    return auth;
}
