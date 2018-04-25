import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toRegister } from "./Actions";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.swapToRegister = this.swapToRegister.bind(this);
    }

    swapToRegister() {
        this.props.dispatch(toRegister());
    }

    render() {
        return (
            <div className="left-inputs" id="login">
                <h1>LOGIN</h1>
                <input className="left-input" placeholder="User ID / Email" />
                <input
                    type="password"
                    className="left-input"
                    placeholder="Password"
                />
                <button className="left-input left-button">Login</button>
                <p className="left-register-link">
                    Don't have an account? Click{" "}
                    <span id="here-link" onClick={this.swapToRegister}>
                        here
                    </span>{" "}
                    to sign up.
                </p>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {};
};

export default connect(mapStateToProps)(Login);
