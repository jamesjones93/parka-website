import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { rootReducer, rootEpic } from './store/root';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from "redux-devtools-extension";

const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(epicMiddleware))(createStore);
// create and set store
const store = createStoreWithMiddleware(rootReducer);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("main")
);
