import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toRegister, userLogin } from "./Actions";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.swapToRegister = this.swapToRegister.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    swapToRegister() {
        this.props.dispatch(toRegister());
    }

    loginUser() {
        let userDetails = {
            email: this.email.value,
            accessCode: this.accessCode.value
        };

        console.log(userDetails);

        this.props.dispatch(userLogin(userDetails));
    }

    render() {
        return (
            <Container>
                <InputField
                    type="text"
                    placeholder="email"
                    innerRef={input => {
                        this.email = input;
                    }}
                    onKeyPress={e => {
                        if (e.key == "Enter") {
                            this.loginUser();
                        }
                    }}
                />
                <InputField
                    type="text"
                    placeholder="access code"
                    innerRef={input => {
                        this.accessCode = input;
                    }}
                    onKeyPress={e => {
                        if (e.key == "Enter") {
                            this.loginUser();
                        }
                    }}
                />
                <LoginButton onClick={this.loginUser}>LOGIN</LoginButton>
                <ToRegisterLink onClick={this.swapToRegister}>
                    request access code
                </ToRegisterLink>
                {this.props.error && (
                    <ErrorMessage>{this.props.error}</ErrorMessage>
                )}
                <ResendCodeLink to="/forgot-code">
                    forgot access code? resend it here.
                </ResendCodeLink>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        error: state.error
    };
};

export default connect(mapStateToProps)(Login);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
`;

const LoginTitle = styled.p`
    font-size: 25px;
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
    ${transition} color: white;
    height: 30px;
    width: 70%;
    margin: 0px 15% 10px 15%;
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

const LoginButton = styled.button`
    ${transition} color: white;
    height: 50px;
    width: 70%;
    padding: 0 10px;
    margin: 40px 15% 10px 15%;
    font-size: 12px;
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

const ToRegisterLink = styled.p`
    ${transition} cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-align: left;
    font-size: 13px;
    margin: 0 15% 10px 15%;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
        width: 80%;
    }
`;

const ErrorMessage = styled.p`
    text-align: left;
    color: rgb(227, 25, 54);
    padding: 0px;
    font-size: 12px;
`;

const ResendCodeLink = styled(Link)`
    cursor: pointer;
    padding: 0;
    color: rgba(227, 25, 54, 0.6);
    text-decoration: underline;
    text-align: left;
    font-size: 13px;
    margin: 0 15%;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
        width: 80%;
    }
`;
