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
import { injectGlobal } from "styled-components";
import styled from "styled-components";
import LoginSignUp from "./LoginSignUp";
import Release from "./Release";
import Header from "./Header";
import Shop from "./Shop";
import Product from "./Product";
import World from "./World";
import Dates from "./Dates";
import Info from "./Info";

injectGlobal`
    body {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        background-color: rgb(250, 250, 250);
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
            <MainContainer>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/release" component={Release} />
                        <Route exact path="/shop" component={Shop} />
                        <Route
                            exact
                            path="/shop/:product"
                            component={Product}
                        />
                        <Route exact path="/world" component={World} />
                        <Route exact path="/dates" component={Dates} />
                        <Route exact path="/info" component={Info} />
                    </div>
                </BrowserRouter>
            </MainContainer>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        release: state.release
    };
};

export default connect(mapStateToProps)(App);

const MainContainer = styled.div`
    background-color: rgb(250, 250, 250);
`;
