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
            <Container>
                <Div>
                    <Logo src="/public/logo/parkalogo.png" />
                    <H2>
                        PLEASE CHECK YOUR EMAIL OR TEXT MESSAGES FOR YOUR
                        PERSONAL ACCESS CODE
                    </H2>
                    <br />
                    <H3>
                        Didn't receive one or have any questions? Please send us
                        an email at{" "}
                        <EmailLink id="mail-link" href="mailto:ops@par-ka.com">
                            ops@par-ka.com
                        </EmailLink>.
                    </H3>
                </Div>
            </Container>
        );
    }
}

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Div = styled.div`
    color: black;

    background-color: rgb(227, 24, 55);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media only screen and (max-device-width: 768px) {
        font-size: 70px;
        width: 80%;
        padding: 0 0 60px 0;
        margin: 0 0 0 10%;
        text-align: center;
    }
`;

const Logo = styled.img`
    width: 215px;
    margin: 0 0 30px 0;

    @media only screen and (max-device-width: 768px) {
        width: 70%;
        margin: 0 auto;
        padding: 0 0 50px 0;
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
    border-top: 2px solid black;
    padding: 30px 0 0 0;
    font-size: 28px;
    width: 360px;
    line-height: 1.2;

    @media only screen and (max-device-width: 768px) {
        font-size: 50px;
        width: 90%;
        line-height: 1.4;
        padding: 0 0 30px 0;
        text-align: center;
    }
`;

const H3 = styled.h3`
    font-size: 18px;
    width: 370px;

    @media only screen and (max-device-width: 768px) {
        font-size: 47px;
        line-height: 1.4;
        width: 90%;
    }
`;

const EmailLink = styled.a`
    ${transition} cursor: pointer;
    padding: 0 0 0px 0;
    color: black;
    text-decoration: none;
    border-bottom: 2px solid black;

    :hover {
        color: white;
        padding: 0 0 5px 0;
    }
`;
