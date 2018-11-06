import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import LoginSignUp from "../userDetails/LoginSignUp";
import EnterParkaSite from "./EnterParkaSite";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Home extends React.Component {

    render() {
        return (
            <Container>
                <ReactCSSTransitionGroup
                    transitionName="loginsignup"
                    transitionEnterTimeout={1100}
                    transitionLeaveTimeout={1100}
                >
                    <LoginSignUp key="1" />
                </ReactCSSTransitionGroup>
                <EnterParkaSite />
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Home);

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: rgb(16, 16, 16);
`;
