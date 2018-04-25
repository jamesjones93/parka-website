import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toLogin, signUp } from "./Actions";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.swapToLogin = this.swapToLogin.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    swapToLogin() {
        this.props.dispatch(toLogin());
    }

    signUp() {
        let userData = {
            email: this.email.value,
            password: this.password.value,
            confirmPassword: this.confirmPassword.value
        };
        console.log("adfa", userData);
        this.props.dispatch(signUp(userData));
    }

    render() {
        return (
            <div className="left-inputs" id="register">
                <h1>SIGN UP</h1>
                <input
                    className="left-input"
                    placeholder="Email"
                    type="text"
                    ref={input => {
                        this.email = input;
                    }}
                />
                <input
                    type="password"
                    className="left-input"
                    placeholder="Password"
                    type="password"
                    ref={input => {
                        this.password = input;
                    }}
                />
                <input
                    type="password"
                    className="left-input"
                    placeholder="Confirm Password"
                    type="password"
                    ref={input => {
                        this.confirmPassword = input;
                    }}
                />
                <button
                    className="left-input left-button"
                    onClick={this.signUp}
                >
                    Register
                </button>
                <p className="left-register-link">
                    Already registered? Click{" "}
                    <span id="here-link" onClick={this.swapToLogin}>
                        here
                    </span>{" "}
                    to login.
                </p>

                {this.props.error && (
                    <p id="signup-error">{this.props.error}</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        error: state.error
    };
};

export default connect(mapStateToProps)(SignUp);
