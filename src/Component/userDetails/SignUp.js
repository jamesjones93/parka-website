import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toLogin } from '../../store/action/toggle/toggleActions';
import { signUp } from '../../store/action/user/userActions';

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
        const userData = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            phoneNumber: this.phoneNumber.value
        };
        this.props.dispatch(signUp(userData));
    }

    render() {
        return (
            <Container>
                <InputField
                    placeholder="first name"
                    type="text"
                    innerRef={input => this.firstName = input}
                    onKeyPress={e => {
                        if (e.key == "Enter") this.signUp();
                    }}
                />
                <InputField
                    placeholder="last name"
                    type="text"
                    innerRef={input => this.lastName = input}
                    onKeyPress={e => {
                        if (e.key == "Enter") this.signUp();
                    }}
                />
                <InputField
                    placeholder="email"
                    type="text"
                    innerRef={input => this.email = input}
                    onKeyPress={e => {
                        if (e.key == "Enter") this.signUp();
                    }}
                />
                <InputField
                    placeholder="number (optional)"
                    type="text"
                    innerRef={input => this.phoneNumber = input}
                />
                <RegisterButton onClick={this.signUp}>REQUEST ACCESS CODE</RegisterButton>

                <ToLoginLink onClick={this.swapToLogin}>or sign in</ToLoginLink>
                {this.props.error && <ErrorMessage>{this.props.error}</ErrorMessage>}
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        error: state.userReducer.error
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
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
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
        border-bottom: 1.3px solid rgba(255, 255, 255, 0.5);

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

const RegisterButton = styled.button`
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

const ToLoginLink = styled.p`
    ${transition} cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-align: left;
    font-size: 13px;
    margin: 0 15%;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
    }
`;

const ErrorMessage = styled.p`
    color: rgb(227, 25, 54);
    text-align: left;
    font-size: 12px;
    margin: 0 auto;
    padding-top: 20px;

    @media only screen and (max-device-width: 768px) {
        font-size: 27px;
    }
`;
