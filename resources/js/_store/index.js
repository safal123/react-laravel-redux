import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from '../_reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const middleware = [ thunk ];

// let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__();
// if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
//     devTools = a => a;
// }

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {;
    let store = createStore(
        persistedReducer,
        compose(applyMiddleware(...middleware))
    );
    let persist = persistStore(store);
    return { store,  persist };
};
