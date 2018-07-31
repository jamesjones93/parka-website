import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import ThankYou from "./ThankYou";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { checkForCookie, toLogin } from "./Actions";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleParkaworldEntry: false,
            cookie: false,
            signUpSuccess: false
        };

        this.swapToLogin = this.swapToLogin.bind(this);
        this.enterParkaWorldClick = this.enterParkaWorldClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(checkForCookie());
    }

    swapToLogin() {
        this.enterParkaWorldClick();
        this.props.dispatch(toLogin());
    }

    enterParkaWorldClick() {
        if (this.props.signUpSuccess || this.props.cookie) {
            location.replace("/world");
        } else {
            this.setState({
                toggleParkaworldEntry: true
            });
        }
    }

    render() {
        return (
            <Container>
                <Tagline>
                    ON A MISSION TO ACCELERATE <br />
                    THE PRESENT. JOIN US
                </Tagline>
                <LoginSignUpContainer>
                    {(this.props.cookie && <p />) ||
                        ((this.state.toggleParkaworldEntry &&
                            ((this.props.toggleLoginSignUp && (
                                <Login id="login-component" key="1" />
                            )) || (
                                <SignUp id="signup-component" key="2" />
                            ))) || (
                            <div>
                                <EnterParkaworldLink
                                    onClick={this.enterParkaWorldClick}
                                >
                                    REQUEST ACCESS CODE
                                </EnterParkaworldLink>
                                <ToLoginLink onClick={this.swapToLogin}>
                                    or sign In
                                </ToLoginLink>
                            </div>
                        ))}
                </LoginSignUpContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    if (state.cookie) {
        location.pathname = "/world";
    }

    return {
        toggleLoginSignUp: state.toggleLoginSignUp,
        cookie: state.cookie,
        signUpSuccess: state.signUpSuccess
    };
};

export default connect(mapStateToProps)(Home);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    color: white;
    width: 35%;
    height: 95%;
    padding: 0 7.55% 5% 7.55%;
    position: fixed;
    background-color: rgb(16, 16, 16);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    @media only screen and (max-device-width: 768px) {
        width: 40%;
        padding: 0 5%;
    }
`;

const Tagline = styled.p`
    width: 80%;
    padding: 0 10% 15% 10%;
    text-align: center;
    align-self: center;

    @media (max-height: 450px) {
        padding: 0 10% 5% 10%;
    }
`;

const LoginSignUpContainer = styled.div`
    width: 100%;
    margin: 0 0 10% 0;
`;

const EnterParkaworldLink = styled.button`
    ${transition} color: white;
    height: 50px;
    width: 100%;
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

const ToLoginLink = styled.p`
    ${transition} cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-align: left;
    font-size: 13px;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
    }
`;
