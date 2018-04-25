import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="left-container">
                <img className="left-logo" src="/logo/parkalogo.png" />

                {(this.props.toggleLoginSignUp && <Login />) || <SignUp />}
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
