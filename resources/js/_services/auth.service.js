import axios from "axios";

export const authService = {
    login,
    logout,
    register,
    socialAuthLogin,
};


function login(data) {
    return axios.post('http://127.0.0.1:8000/api/login', data)
        .then(response =>{
            return setUserInfo(response);
        });
}

function logout() {
    // Remove user and token from localstorage
    localStorage.removeItem('auth');
}

function register(data) {
    return axios.post('http://127.0.0.1:8000/api/register', data)
        .then(response => {
            return setUserInfo(response);
        })
}

function socialAuthLogin(data) {
    return axios.post(`http://localhost:8000/api/login/google`, data )
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
