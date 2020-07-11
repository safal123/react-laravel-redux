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


// function handleResponse(response) {
//     console.log(response);
//     return response.statusText().then(statusText => {
//         const data = statusText && JSON.parse(statusText);
//         console.log(data);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 console.log("You are logged out.")
//                 location.reload(true);
//             }
//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }
//         return data;
//     });
// }
