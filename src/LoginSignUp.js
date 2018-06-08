import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import ThankYou from "./ThankYou";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { checkForCookie } from "./Actions";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleParkaworldEntry: false,
            cookie: false,
            signUpSuccess: false
        };

        this.enterParkaWorldClick = this.enterParkaWorldClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(checkForCookie());
    }

    enterParkaWorldClick() {
        if (this.props.signUpSuccess || this.props.cookie) {
            location.replace("/world");
            // this.props.history.push("/world");
        } else {
            this.setState({
                toggleParkaworldEntry: true
            });
        }
    }

    render() {
        return (
            <Container>
                <LoginSignUpContainer>
                    <ReactCSSTransitionGroup
                        transitionName="loginsignup"
                        transitionEnterTimeout={1100}
                        transitionLeaveTimeout={1100}
                    >
                        {(this.props.cookie && <p />) ||
                            ((!this.props.signUpSuccess &&
                                ((this.state.toggleParkaworldEntry &&
                                    ((this.props.toggleLoginSignUp && (
                                        <Login id="login-component" key="1" />
                                    )) || (
                                        <SignUp id="signup-component" key="2" />
                                    ))) || <p />)) || <ThankYou />)}
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
    width: 50%;
    padding: 20px 0 30px 0;
    height: 100vh;
    position: fixed;
    background-color: rgb(227, 25, 54);
    display: flex;
    justify-content: center;
`;

const LoginSignUpContainer = styled.div`
    height: 70%;
    width: 100%;
    position: absolute;
    margin: 30px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const EnterParkaworldLink = styled.p`
    ${transition} font-size: 40px;
    align-self: flex-end;
    text-align: center;
    width: 80%;
    padding: 20px 0 2% 0;
    border-top: 3px solid white;
    cursor: pointer;
    color: white;

    :hover {
        color: rgb(16, 16, 16);
    }
`;
