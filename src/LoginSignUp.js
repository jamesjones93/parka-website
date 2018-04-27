import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
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
            <div className="left-container">
                <img className="left-logo" src="/logo/parkalogo.png" />
                <div id="loginsignup-container">
                    <ReactCSSTransitionGroup
                        transitionName="loginsignup"
                        transitionEnterTimeout={1100}
                        transitionLeaveTimeout={1100}
                    >
                        {(this.props.toggleLoginSignUp && (
                            <Login id="login-component" key="1" />
                        )) || <SignUp id="signup-component" key="2" />}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
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
