require('./bootstrap');
// require('./App/App');

import { PersistGate } from "redux-persist/integration/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import React, {Suspense} from "react";
import { Provider } from "react-redux";
import configureStore from './_store';
import App from "./App/App";

const { store, persist } = configureStore();

if (document.getElementById('app')) {
    ReactDOM.render(
        <Suspense fallback={'<h1>Loading...</h1>'}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={ persist }>
                    <App />
                </PersistGate>
            </Provider>
        </Suspense>,
        document.getElementById('app'));
}
