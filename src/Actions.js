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

// ===================================================================================== get products and collections

export function getAllProducts() {
    return client.product.fetchAll().then(products => {
        products.reverse();
        return {
            type: "GET_PRODUCTS",
            products: products
        };
    });
}
//
// export function getRecords() {
//     const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzUwMTczNzcxODMz";
//
//     return client.collection
//         .fetchWithProducts(collectionId)
//         .then(collection => {
//             console.log(collection);
//             return {
//                 type: "GET_RECORDS",
//                 records: collection
//             };
//         })
//         .catch(e => {
//             console.log(e);
//         });
// }

export function getProduct(params) {
    return client.product.fetchAll().then(products => {
        let product = products.filter(product => product.handle === params);

        return {
            type: "GET_PRODUCT",
            product: product[0]
        };
    });
}

// ===================================================================================== shopping cart

export function addToCart(productInfo) {
    return axios
        .get("/check-for-existing-checkout")
        .then(function({ data }) {
            productInfo.checkoutId = data.checkoutId;
            return productInfo;
        })
        .then(productInfo => {
            const lineItemsToAdd = [
                { variantId: productInfo.id, quantity: productInfo.quantity }
            ];

            return client.checkout
                .addLineItems(productInfo.checkoutId, lineItemsToAdd)
                .then(checkout => {
                    // Do something with the updated checkout
                    return {
                        type: "GET_CART",
                        cart: checkout
                    };
                })
                .catch(console.log);
        })
        .catch(console.log);
}

export function getCart() {
    return axios
        .get("/check-for-existing-checkout")
        .then(function({ data }) {
            const checkoutId = data.checkoutId;

            if (data.checkoutId) {
                return client.checkout
                    .fetch(checkoutId)
                    .then(checkout => {
                        return {
                            type: "GET_CHECKOUT",
                            checkout: checkout
                        };
                    })
                    .catch(console.log);
            } else {
                return client.checkout
                    .create()
                    .then(checkout => {
                        axios
                            .post("/save-checkout-to-cookie", {
                                checkoutId: checkout.id
                            })
                            .catch(console.log);

                        return {
                            type: "GET_CHECKOUT",
                            checkout: checkout
                        };
                    })
                    .catch(console.log);

                return {
                    type: "NO_CART",
                    noCheckout: "Nothing has been added to the cart yet."
                };
            }
        })
        .catch(console.log);
}

export function removeProduct(productId) {
    return axios
        .get("/check-for-existing-checkout")
        .then(function({ data }) {
            const checkoutId = data.checkoutId;
            if (data.checkoutId) {
                return client.checkout
                    .removeLineItems(checkoutId, productId)
                    .then(checkout => {
                        console.log(checkout);
                        return {
                            type: "GET_CHECKOUT",
                            checkout: checkout
                        };
                    })
                    .catch(console.log);
            } else {
                return {
                    type: "NO_CART",
                    noCheckout: "Nothing has been added to the cart yet."
                };
            }
        })
        .catch(console.log);
}

export function showCart() {
    return {
        type: "TOGGLE_CART",
        showCart: true
    };
}

export function hideCart() {
    return {
        type: "TOGGLE_CART",
        showCart: false
    };
}

// ===================================================================================== dates

export function getDates() {
    return axios.get("/get-dates").then(function({ data }) {
        return {
            type: "GET_DATES",
            dates: data.dates
        };
    });
}
