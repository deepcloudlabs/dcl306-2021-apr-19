import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import AppConnector from "./app-connector";
import AppReducer from "./app-reducer";

let reducers = combineReducers({appStore: AppReducer});

let store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <AppConnector />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
