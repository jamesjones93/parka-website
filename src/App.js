import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import * as PropTypes from "prop-types";
import { Page, Card, Button } from "@shopify/polaris";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import { injectGlobal } from "styled-components";
import styled from "styled-components";
import Home from "./Home";
import LoginSignUp from "./LoginSignUp";
import Release from "./Release";
import Header from "./Header";
import Shop from "./Shop";
import Product from "./Product";
import World from "./World";
import Dates from "./Dates";
import Info from "./Info";
import Checkout from "./Checkout";

injectGlobal`
    @font-face {
        font-family: Graphik;
        src: url('/font/graphik-font.otf') format('opentype');
    }

    body {
        margin: 0;
        font-family: 'Karla', sans-serif;
        background-color: rgb(250, 250, 250);
    }
`;

// black: rgb(16, 16, 16)
// white: rgb(250, 250, 250)
// red: rgb(227, 25, 54);
// green: rgb(2, 105, 55)

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cookieAccepted: false
        };

        this.acceptCookies = this.acceptCookies.bind(this);
    }

    componentDidMount() {
        axios.get("/check-for-cookie-accept").then(function({ data }) {
            if (data.cookieAccepted === true) {
                console.log("in here");
                this.setState({ cookieAccepted: true });
            }
        });
    }

    acceptCookies() {
        this.setState({ cookieAccepted: true });
        axios.post("/accepted-cookie-banner").then(function({ data }) {});
    }

    render() {
        return (
            <MainContainer>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/release" component={Release} />
                        <Route exact path="/shop/:filter" component={Shop} />
                        <Route
                            exact
                            path="/shop/product/:product"
                            component={Product}
                        />
                        <Route exact path="/world" component={World} />
                        <Route exact path="/dates" component={Dates} />
                        <Route exact path="/info" component={Info} />
                        <Route exact path="/checkout" component={Checkout} />
                        {!this.state.cookieAccepted && (
                            <CookieBanner onClick={this.acceptCookies}>
                                <p>
                                    This site uses cookies. By continuing to use
                                    this site, you are agreeing to our use of
                                    cookies.
                                </p>
                                <CookieButton>OK</CookieButton>
                            </CookieBanner>
                        )}
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

const transition = `
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
`;

const MainContainer = styled.div`
    background-color: rgb(250, 250, 250);
`;

const CookieBanner = styled.div`
    width: 100%;
    height: 5%;
    min-height: 25px;
    position: absolute;
    top: 95%;
    background-color: rgb(250, 250, 250);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 13px;
`;

const CookieButton = styled.div`
    ${transition} width: 30px;
    height: 20px;
    margin: 0 0 0 10px;
    font-size: 15px;
    display: flex;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;

    :hover {
        background-color: rgb(2, 105, 55);
    }
`;
