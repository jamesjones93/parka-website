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

        this.state = {
            toggleParkaworldEntry: false
        };

        this.enterParkaWorldClick = this.enterParkaWorldClick.bind(this);
    }

    enterParkaWorldClick() {
        this.setState({
            toggleParkaworldEntry: true
        });
    }

    render() {
        return (
            <Container>
                <Logo src="/logo/parkalogowhite.png" />
                <LoginSignUpContainer>
                    <ReactCSSTransitionGroup
                        transitionName="loginsignup"
                        transitionEnterTimeout={1100}
                        transitionLeaveTimeout={1100}
                    >
                        {(this.state.toggleParkaworldEntry &&
                            ((this.props.toggleLoginSignUp && (
                                <Login id="login-component" key="1" />
                            )) || (
                                <SignUp id="signup-component" key="2" />
                            ))) || <p />}
                    </ReactCSSTransitionGroup>
                </LoginSignUpContainer>
                <EnterParkaworldLink onClick={this.enterParkaWorldClick}>
                    ENTER PARKA.WORLD
                </EnterParkaworldLink>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        toggleLoginSignUp: state.toggleLoginSignUp
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
    position: relative;
    width: 50%;
    padding: 20px 0 30px 0;
    height: 100vh;
    position: fixed;
    background-color: rgb(227, 25, 54);
    display: flex;
    justify-content: center;
`;

const Logo = styled.img`
    width: 75px;
    height: 20px;

    @media only screen and (max-device-width: 768px) {
        width: 70%;
        margin: 0 auto;
        padding: 0 0 50px 0;
    }
`;

const LoginSignUpContainer = styled.p`
    height: 70%;
    width: 100%;
    position: absolute;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const EnterParkaworldLink = styled.p`
    ${transition} font-size: 35px;
    align-self: flex-end;
    position: absolute;
    text-align: center;
    width: 80%;
    padding: 20px 0 0 0;
    border-top: 3px solid white;
    cursor: pointer;

    :hover {
        color: rgba(255, 255, 255, 0.5);
    }
`;
