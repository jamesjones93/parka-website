import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import { render } from "react-dom";
import * as PropTypes from "prop-types";
import { Page, Card, Button } from "@shopify/polaris";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import LoginSignUp from "./LoginSignUp";
import Release from "./Release";
import { checkLogin } from "./Actions";
import { injectGlobal } from "styled-components";

injectGlobal`
    body {
        margin: 0;

    }
    a {
        text-decoration: none;
        color: white;
    }
`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/release" component={Release} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        release: state.release
    };
};

export default connect(mapStateToProps)(App);
