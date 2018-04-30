import React from "react";
import axios from "./axios";
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
                <h1>LOGIN</h1>
                <Input
                    type="text"
                    placeholder="User ID / Email"
                    innerRef={input => {
                        this.email = input;
                    }}
                />
                <Input
                    type="password"
                    placeholder="Access Code"
                    innerRef={input => {
                        this.accessCode = input;
                    }}
                />
                <LoginButton onClick={this.loginUser}>Login</LoginButton>
                <RegisterText>
                    Don't have an account? Click{" "}
                    <HereLink onClick={this.swapToRegister}>here</HereLink> to
                    sign up.
                </RegisterText>
                {this.props.error && (
                    <ErrorMessage>{this.props.error}</ErrorMessage>
                )}
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
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
`;

const Container = styled.div`
    text-align: center;
`;

const Input = styled.input`
    color: white;
    height: 45px;
    width: 300px;
    margin: 10px 0 10px 0;
    font-size: 20px;
    background-color: inherit;
    border: none;
    border-bottom: 1px solid white;
    :hover {
        ${transition} border-bottom: 1px solid red;
        ::placeholder {
            ${transition} color: red;
        }
    }

    :focus {
        outline: none;
        border-bottom: 1px solid red;
        color: red;
        ::placeholder {
            ${transition} color: red;
        }
    }

    ::placeholder {
        ${transition} color: white;
    }
`;

const LoginButton = styled.button`
    color: white;
    height: 45px;
    width: 305px;
    padding: 0 10px;
    margin: 10px 0 10px 0;
    font-size: 20px;
    background-color: inherit;
    text-align: center;
    border: none;
    border: 1px solid white;

    :hover {
        ${transition} color: red;
        border: 1px solid red;
    }
    cursor: pointer;

    :focus {
        outline: none;
    }
`;

const RegisterText = styled.p`
    text-align: center;
`;

const HereLink = styled.span`
    cursor: pointer;
    :hover {
        ${transition} color: red;
        padding: 0 0 5px 0;
        border-bottom: 1px solid red;
    }
`;

const ErrorMessage = styled.p`
    margin: 0 auto;
    text-align: center;
    color: red;
    width: 300px;
`;
