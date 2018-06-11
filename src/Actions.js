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

export function checkForCookie() {
    return axios.get("/check-for-cookie").then(function({ data }) {
        if (data.cookie) {
            return {
                type: "COOKIE_SUCCESS",
                cookie: data.cookie
            };
        }
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
        if (data.user) {
            return {
                type: "SIGNUP_SUCCESS",
                signUpSuccess: true
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
    return axios.post("/user-login", userData).then(function({ data }) {
        if (data.error) {
            return {
                type: "LOGIN_ERROR",
                error: data.error
            };
        } else {
            return {
                type: "COOKIE_SUCCESS",
                cookie: true
            };
        }
    });
}

export function getAllProducts() {
    return client.product.fetchAll().then(products => {
        return {
            type: "GET_PRODUCTS",
            products: products
        };
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

export function getProduct(params) {
    return client.product.fetchAll().then(products => {
        let product = products.filter(product => product.handle === params);

        return {
            type: "GET_PRODUCT",
            product: product[0]
        };
    });
}
