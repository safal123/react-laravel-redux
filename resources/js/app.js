require('./bootstrap');
// require('./App/App');

import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import React, {Suspense} from "react";
import {Provider} from "react-redux";
import store from "./_store";
import App from "./App/App";

if (document.getElementById('app')) {
    ReactDOM.render(
        <Suspense fallback={'<h1>Loading...</h1>'}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>,
        document.getElementById('app'));
}
