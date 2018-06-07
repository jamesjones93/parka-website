import axios from "./axios";
import * as io from "socket.io-client";
import Client from "shopify-buy";
const client = Client.buildClient({
    domain: "parka-records.myshopify.com",
    storefrontAccessToken: "e3b25dce26eb25d4dd3595fd82ecb0ad"
});

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
    return axios.post("/user-login", userData).then(function({ data }) {
        console.log(data);

        if (data.error) {
            return {
                type: "LOGIN_ERROR",
                error: data.error
            };
        } else {
            return {
                type: "LOGIN_SUCCESS",
                user: data.user
            };
        }
    });
}

export function getRecords() {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzUwMTczNzcxODMz";

    return client.collection
        .fetchWithProducts(collectionId)
        .then(collection => {
            console.log(collection);
            return {
                type: "GET_RECORDS",
                records: collection
            };
        })
        .catch(e => {
            console.log(e);
        });
}
