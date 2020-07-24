import axios from "axios";
import api from "../_helpers/api";

export const authService = {
    login,
    logout,
    register,
    socialAuthLogin,
};


function login(data) {
    return api().post('/login', data)
        .then(response =>{
            return setUserInfo(response);
        });
}

function logout() {
    console.log(api());
    return api().post('/logout')
        .then(() => {
            localStorage.removeItem('auth');
            console.log('Successfully logged out.')
        }).catch(error =>{
            localStorage.removeItem('auth');
            console.log(error.response);
        })
}

function register(data) {
    return api().post('/register', data)
        .then(response => {
            return setUserInfo(response);
        })
}

function socialAuthLogin(data) {
    return api().post('/login/google', data )
        .then(response =>{
            return setUserInfo(response);
    })
}

function setUserInfo(response) {
    const auth = response.data.success
    // Store user and token to local storage
    localStorage.setItem('auth', JSON.stringify(auth))
    return auth;
}
