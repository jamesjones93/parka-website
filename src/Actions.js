import axios from "./axios";
import * as io from "socket.io-client";

export function toRegister() {
    return {
        type: "TOGGLE_TO_SIGNUP",
        toggleLoginSignUp: false
    };
}

export function toLogin() {
    return {
        type: "TOGGLE_TO_LOGIN",
        toggleLoginSignUp: true
    };
}

export function signUp(userData) {
    console.log(userData);
    return axios.post("/register-user", userData).then(function({ data }) {
        if (data.success) {
            return {
                type: "SIGNUP_SUCCESS",
                success: true
            };
        } else {
            return {
                type: "SIGNUP_USER",
                error: data.error
            };
        }
    });
}
