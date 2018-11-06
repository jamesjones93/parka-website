import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import { injectGlobal } from "styled-components";
import styled from "styled-components";
import Home from "./Component/home/Home";
import ResendCode from "./Component/codeResend/ResendCode";
import Header from "./Component/header/Header";
import Shop from "./Component/shop/Shop";
import Product from "./Component/shop/Product";
import World from "./Component/world/World";
import Dates from "./Component/dates/Dates";
import Info from "./Component/info/Info";
import Checkout from "./Component/shop/Checkout";

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
            if (data.cookieAccepted === true) this.setState({ cookieAccepted: true });
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
                        <Route
                            exact
                            path="/forgot-code"
                            component={ResendCode}
                        />
                        {!this.state.cookieAccepted && (
                            <CookieBanner
                                onClick={this.acceptCookies}
                                style={{
                                    opacity: 0.7,
                                    position: "fixed"
                                }}
                            >
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
