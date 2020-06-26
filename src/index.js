import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./store/reducers/auth"
import cartReducer from "./store/reducers/cart"
import itemReducer from "./store/reducers/item"
import orderReducer from "./store/reducers/order"
import axios from "axios"

const composeEnhancers =process.env.NODE_ENV==="development"? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;

const rootReducer=combineReducers({
    authState:authReducer,
    cartState:cartReducer,
    itemState:itemReducer,
    orderState:orderReducer
})



const store=createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
    ))

axios.interceptors.request.use(config=>{
    const token=store.getState().authState.token
    config.headers.Authorization=`Bearer ${token}`
    return config
})

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
