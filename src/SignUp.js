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
            email: this.email.value
        };
        console.log("adfa", userData);
        this.props.dispatch(signUp(userData));
    }

    render() {
        return (
            <Container>
                <h1>SIGN UP</h1>
                <Input
                    placeholder="Email"
                    type="text"
                    innerRef={input => {
                        this.email = input;
                    }}
                />
                <RegisterButton onClick={this.signUp}>Register</RegisterButton>
                <RegisterText className="left-register-link">
                    Already registered? Click{" "}
                    <HereLink onClick={this.swapToLogin}>here</HereLink> to
                    login.
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

export default connect(mapStateToProps)(SignUp);

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

const RegisterButton = styled.button`
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
    color: red;
`;
