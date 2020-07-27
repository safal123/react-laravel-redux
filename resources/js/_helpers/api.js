import axios  from 'axios';

let baseApi = axios.create({
    // baseURL: "http://laravel-react-redux.herokuapp.com/api"
    baseURL: process.env.NODE_ENV === 'development'
        ? "http://localhost:8000/api"
        : "http://laravel-react-redux.herokuapp.com/api",
})

let api = () => {
    let token = JSON.parse(localStorage.getItem('auth'));
    if(token){
        baseApi.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
    }
    return baseApi;
}
export default api;


