import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import ThankYou from "./ThankYou";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { resendCode } from "./Actions";

class ForgotCode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };
        this.resendCodeClick = this.resendCodeClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            email: e.currentTarget.value
        });
    }

    resendCodeClick() {
        this.props.dispatch(resendCode(this.state));
    }

    render() {
        return (
            <div>
                <Container>
                    <EmailInput
                        onChange={this.handleChange}
                        placeholder="enter your email address here"
                    />
                    <ResendButton onClick={this.resendCodeClick}>
                        RESEND
                    </ResendButton>
                </Container>
                <ContainerTwo />
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    if (state.redirectToHome) {
        location.pathname = "/";
    }
    return {};
};

export default connect(mapStateToProps)(ForgotCode);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    color: white;
    width: 35%;
    height: 100%;
    padding: 0 7.5%;
    position: fixed;
    background-color: rgb(16, 16, 16);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media only screen and (max-device-width: 768px) {
        width: 40%;
        padding: 0 5%;
    }
`;

const ContainerTwo = styled.div`
    width: 50%;
    height: 100%;
    left: 50%;
    position: fixed;
    background-color: rgb(227, 25, 54);
`;

const EmailInput = styled.input`
    ${transition} color: white;
    height: 30px;
    width: 92.5%;
    padding: 0;
    font-size: 12px;
    background-color: inherit;
    border: none;
    display: block;
    border-bottom: 1.3px solid white;

    :hover {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);

        ::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    :focus {
        outline: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    }

    ::placeholder {
        ${transition} color: white;
        font-size: 14px;
    }

    @media only screen and (max-device-width: 768px) {
        width: 100%;
        height: 100px;

        font-size: 35px;

        ::placeholder {
            font-size: 35px;
        }
    }
`;

const ResendButton = styled.button`
    ${transition} color: white;
    height: 50px;
    width: 92.5%;
    padding: 0 10px;
    margin: 40px 0 10px 0;
    font-size: 20px;
    background-color: inherit;
    text-align: center;
    border: none;
    border: 1px solid white;

    :hover {
        color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.5);
    }
    cursor: pointer;

    :focus {
        outline: none;
    }

    @media only screen and (max-device-width: 768px) {
        width: 100%;
        height: 100px;
        font-size: 35px;
        height: 140px;
    }
`;
