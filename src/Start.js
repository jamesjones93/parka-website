import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer from "./reducers";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { EmbeddedApp } from "@shopify/polaris/embedded";

export const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("main")
);

// <EmbeddedApp
//     apiKey="YOUR_APP_API_KEY"
//     shopOrigin="http://localhost:8080/"
// >
//     <App />
// </EmbeddedApp>
