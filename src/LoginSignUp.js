import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

const LeftContainer = styled.div`
    color: white;
    width: 50%;
    height: 100vh;
    position: fixed;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    overflow: hidden;
`;

const Logo = styled.img`
    width: 300px;
    margin: 0 0 30px 0;
    position: absolute;
    top: 120px;
`;

const LoginSignUpContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    top: 250px;
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LeftContainer>
                <Logo src="/logo/parkalogo.png" />
                <LoginSignUpContainer>
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
    // state.toggleLoginSignUp = !state.toggleLoginSignUp;
    return {
        toggleLoginSignUp: state.toggleLoginSignUp
    };
};

export default connect(mapStateToProps)(Home);
