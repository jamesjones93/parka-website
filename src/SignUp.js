import React from "react";
import axios from "./axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toLogin, signUp } from "./Actions";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.swapToLogin = this.swapToLogin.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    swapToLogin() {
        this.props.dispatch(toLogin());
    }

    signUp() {
        console.log(this.email.value);
        let userData = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value
            // phoneNumber: this.phoneNumber.value
        };
        console.log("adfa", userData);
        this.props.dispatch(signUp(userData));
    }

    render() {
        return (
            <Container>
                <ComingSoon>PARKA.WORLD COMING SOON</ComingSoon>
                <br />
                <ReqAccessCode>
                    REQUEST ACCESS CODE FOR EXCLUSIVE CONTENT & FREE MERCH
                </ReqAccessCode>

                <InputField
                    placeholder="first name"
                    type="text"
                    innerRef={input => {
                        this.firstName = input;
                    }}
                />

                <InputField
                    placeholder="last name"
                    type="text"
                    innerRef={input => {
                        this.lastName = input;
                    }}
                />

                <InputField
                    placeholder="email"
                    type="text"
                    innerRef={input => {
                        this.email = input;
                    }}
                />

                <RegisterButton onClick={this.signUp}>
                    request access code
                </RegisterButton>

                {this.props.error && (
                    <ErrorMessage>{this.props.error}</ErrorMessage>
                )}
            </Container>
        );
    }
}

// <InputField
//     placeholder="Number (optional)"
//     type="text"
//     innerRef={input => {
//         this.phoneNumber = input;
//     }}
// />

// <RegisterText className="left-register-link">
//     Already registered? Click{" "}
//     <HereLink onClick={this.swapToLogin}>here</HereLink> to
//     login.
// </RegisterText>

const mapStateToProps = function(state) {
    return {
        error: state.error
    };
};

export default connect(mapStateToProps)(SignUp);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    text-align: center;
    color: black;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 35px;
        margin: 0 0 30px 0;
        color: black;
    }
`;

const ComingSoon = styled.p`
    font-size: 20px;
    margin: 0 0 10px 0;
    text-align: left;

    @media only screen and (max-device-width: 768px) {
        font-size: 50px;
        padding: 50px 0 40px 0;
        margin: 0 auto;
    }
`;

const ReqAccessCode = styled.p`
    font-size: 30px;
    width: 370px;
    line-height: 1.2;
    padding: 0 0 15px 0;
    text-align: left;

    @media only screen and (max-device-width: 768px) {
        font-size: 45px;
        width: 80%;
        margin: 0 auto;

        text-align: center;
    }
`;

const InputField = styled.input`
    ${transition} color: black;
    height: 55px;
    width: 350px;
    margin: 0px 0 10px 0;
    font-size: 28px;
    background-color: inherit;
    border: none;
    display: block;
    border-bottom: 2px solid black;
    :hover {
        border-bottom: 1px solid white;
        color: white;
        ::placeholder {
            ${transition} color: white;
        }
    }

    :focus {
        outline: none;
        border-bottom: 1px solid white;
        color: white;
        ::placeholder {
            ${transition} color: white;
        }
    }

    ::placeholder {
        ${transition} color: black;

        font-size: 28px;
    }

    @media only screen and (max-device-width: 768px) {
        width: 80%;
        height: 100px;

        font-size: 45px;
        margin: 30px 0 0 10%;

        ::placeholder {
            font-size: 45px;
        }
    }
`;

const RegisterButton = styled.button`
    ${transition} color: black;
    height: 70px;
    width: 350px;
    padding: 0 10px;
    margin: 40px 0 10px 0;
    font-size: 28px;
    background-color: inherit;
    text-align: center;
    border: none;
    border: 2px solid black;

    :hover {
        color: white;
        border: 1px solid white;
    }
    cursor: pointer;

    :focus {
        outline: none;
    }

    @media only screen and (max-device-width: 768px) {
        width: 80%;
        height: 100px;
        margin: 65px 0 0 10%;
        font-size: 45px;
        height: 140px;
    }
`;

const RegisterText = styled.p`
    text-align: center;
`;

const HereLink = styled.span`
    ${transition} cursor: pointer;
    border-bottom: 1px solid black;
    padding: 0 0 2px 0;

    :hover {
        color: white;
        padding: 0 0 5px 0;
        border-bottom: 1px solid white;
    }
`;

const ErrorMessage = styled.p`
    color: white;
    text-align: center;
    width: 320px;
    margin: 0 auto;
    padding: 0px;

    @media only screen and (max-device-width: 768px) {
        font-size: 27px;
    }
`;
