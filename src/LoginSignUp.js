import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LeftContainer>
                <LoginSignUpContainer>
                    <Logo src="/logo/parkalogoblack.png" />
                    <ReactCSSTransitionGroup
                        transitionName="loginsignup"
                        transitionEnterTimeout={1100}
                        transitionLeaveTimeout={1100}
                    >
                        {(this.props.toggleLoginSignUp && (
                            <Login id="login-component" key="1" />
                        )) || <SignUp id="signup-component" key="2" />}
                    </ReactCSSTransitionGroup>
                </LoginSignUpContainer>
            </LeftContainer>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        toggleLoginSignUp: state.toggleLoginSignUp
    };
};

export default connect(mapStateToProps)(Home);

const LeftContainer = styled.div`
    color: white;
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: rgb(227, 24, 55);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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

const LoginSignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
