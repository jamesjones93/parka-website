import React from "react";
import axios from "./axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Release extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Div>
                <ThankYou>You are now enrolled</ThankYou>
                <H2>
                    Please check your email / text messages for your personal
                    access code.
                </H2>
                <br />
                <H3>
                    Didn't receive one or have any questions? Please send us an
                    email at{" "}
                    <EmailLink id="mail-link" href="mailto:ops@par-ka.com">
                        ops@par-ka.com
                    </EmailLink>.
                </H3>
            </Div>
        );
    }
}

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Div = styled.div`
    color: black;
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgb(227, 24, 55);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (max-device-width: 768px) {
        font-size: 70px;
        width: 80%;
        padding: 0 0 60px 0;
        margin: 0 0 0 10%;
        text-align: center;
    }
`;

const ThankYou = styled.p`
    font-size: 50px;
    padding: 0 0 40px 0;

    @media only screen and (max-device-width: 768px) {
        font-size: 70px;
        width: 80%;
        padding: 0 0 60px 0;
        height: 120px;
    }
`;

const H2 = styled.h2`
    @media only screen and (max-device-width: 768px) {
        font-size: 50px;
        width: 80%;
        line-height: 1.4;
        padding: 0 0 30px 0;
        text-align: center;
    }
`;

const H3 = styled.h3`
    @media only screen and (max-device-width: 768px) {
        font-size: 47px;
        line-height: 1.4;
    }
`;

const EmailLink = styled.a`
    ${transition} cursor: pointer;
    padding: 0 0 2px 0;
    color: white;
    text-decoration: none;

    :hover {
        color: white;
        padding: 0 0 5px 0;
        border-bottom: 1px solid white;
    }
`;
