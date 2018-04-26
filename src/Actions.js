import axios from "./axios";
import * as io from "socket.io-client";

export function checkLogin() {
    return axios.get("/check-login").then(function({ data }) {
        return {
            type: "CHECK_LOGIN",
            user: data.user
        };
    });
}

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
        console.log("DATA", data.user);
        if (data.user) {
            return {
                type: "SIGNUP_SUCCESS",
                user: data.user
            };
        } else {
            return {
                type: "SIGNUP_ERROR",
                error: data.error
            };
        }
    });
}

export function userLogin(userData) {
    console.log(userData);

    return axios.post("/user-login", userData).then(function({ data }) {});
}
