import React from "react";
import axios from "./axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { Page, Card, Button } from "@shopify/polaris";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import LoginSignUp from "./LoginSignUp";
import { checkLogin } from "./Actions";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(checkLogin());
    }

    render() {
        return <div>{!this.props.user && <LoginSignUp />}</div>;
    }
}

const mapStateToProps = function(state) {
    console.log(state.hideLeftWindow);
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Home);
