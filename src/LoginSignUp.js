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
                    <ExclusiveContentTitle>
                        Exclusive music, mixes, <br />
                        merch, video & other goods
                    </ExclusiveContentTitle>
                    {(this.props.cookie && <p />) ||
                        ((!this.props.signUpSuccess &&
                            ((this.state.toggleParkaworldEntry &&
                                ((this.props.toggleLoginSignUp && (
                                    <Login id="login-component" key="1" />
                                )) || (
                                    <SignUp id="signup-component" key="2" />
                                ))) || (
                                <EnterParkaworldLink
                                    onClick={this.enterParkaWorldClick}
                                >
                                    REQUEST ACCESS CODE
                                </EnterParkaworldLink>
                            ))) || <ThankYou />)}
                </LoginSignUpContainer>
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
    width: 40%;
    padding: 10% 5%;
    height: 90%;
    position: fixed;
    background-color: rgb(16, 16, 16);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

const ExclusiveContentTitle = styled.p`
    font-size: 25px;
    position: relative;
`;

const LoginSignUpContainer = styled.div`
    width: 100%;
    margin: 0 0 10% 0;
    position: relative;
`;

const EnterParkaworldLink = styled.p`
    ${transition} font-size: 20px;

    text-align: center;
    width: 60%;
    padding: 10px;
    border: 3px solid white;
    cursor: pointer;
    color: white;

    :hover {
        color: rgb(16, 16, 16);
    }
`;
