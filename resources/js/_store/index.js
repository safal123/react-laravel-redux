import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from '../_reducers';

const initialState = {};

const middleware = [ thunk ];

// eslint-disable-next-line no-underscore-dangle
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;
}

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        devTools,
    )

);

export default store;
