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
import { checkLogin } from "./Actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(checkLogin());
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/home" component={Home} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log(state.hideLeftWindow);
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(App);
