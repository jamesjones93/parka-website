import React from "react";
import axios from "./axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { Page, Card, Button } from "@shopify/polaris";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import LoginSignUp from "./LoginSignUp";
import ThankYou from "./ThankYou";
import { checkLogin } from "./Actions";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.dispatch(checkLogin());
    }

    render() {
        return (
            <Container>
                <ReactCSSTransitionGroup
                    transitionName="loginsignup"
                    transitionEnterTimeout={1100}
                    transitionLeaveTimeout={1100}
                >
                    {(!this.props.user && <LoginSignUp key="1" />) || (
                        <ThankYou key="2" />
                    )}
                </ReactCSSTransitionGroup>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    console.log(state.hideLeftWindow);
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Home);

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgb(227, 24, 55);
`;
