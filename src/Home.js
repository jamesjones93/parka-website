import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { Page, Card, Button } from "@shopify/polaris";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import LoginSignUp from "./LoginSignUp";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div />;
    }
}
