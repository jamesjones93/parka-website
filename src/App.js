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
import Header from "./Header";
import Shop from "./Shop";
import { checkLogin } from "./Actions";
import { injectGlobal } from "styled-components";

injectGlobal`
    body {
        margin: 0;
        font-family: Helvetica;
    }
`;

// black: rgb(16, 16, 16)
// white: rgb(250, 250, 250)
// red: rgb(227, 25, 54);

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
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/release" component={Release} />
                        <Route exact path="/shop" component={Shop} />
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
