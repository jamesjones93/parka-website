import axios from "../../axios";
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
                type: "COOKIE_STATUS",
                cookie: true
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
            location.pathname = "/world";
            return {
                type: "SIGNUP_ERROR",
                error: data.error
            };
        }
    });
}

export function userLogin(userData) {
    return axios.post("/user-login", userData).then(function({ data }) {
        if (data.error) {
            return {
                type: "LOGIN_ERROR",
                error: data.error
            };
        } else {
            location.pathname = "/world";
            return {
                type: "COOKIE_SUCCESS",
                cookie: true
            };
        }
    });
}

export function resendCode(email) {
    return axios.post("/resend-code", email).then(function({ data }) {
        return {
            type: "CODE_RESENT",
            success: true
        };
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

export function getProduct(params) {
    return client.product.fetchAll().then(products => {
        let product = products.filter(product => product.handle === params);
        return {
            type: "GET_PRODUCT",
            product: product[0]
        };
    });
}

export function clearProduct() {
    return {
        type: "CLEAR_PRODUCT"
    };
}

// ===================================================================================== shopping cart

export function addToCart(productInfo) {
    return axios
        .get("/get-checkout")
        .then(function({ data }) {
            productInfo.checkoutId = data.checkoutId;
            return productInfo;
        })
        .then(productInfo => {
            let quantity = parseInt(productInfo.quantity);
            const lineItemsToAdd = [
                { variantId: productInfo.id, quantity: quantity }
            ];

            return client.checkout
                .addLineItems(productInfo.checkoutId, lineItemsToAdd)
                .then(checkout => {
                    return {
                        type: "GET_CHECKOUT",
                        checkout: checkout
                    };
                })
                .catch(console.log);
        })
        .catch(console.log);
}

export function getCart() {
    return axios
        .get("/get-checkout")
        .then(function({ data }) {
            const checkoutId = data.checkoutId;

            if (data.checkoutId) {
                return client.checkout
                    .fetch(checkoutId)
                    .then(checkout => {
                        if (checkout.completedAt) {
                            return client.checkout
                                .create()
                                .then(checkout => {
                                    return axios
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
                        } else {
                            return {
                                type: "GET_CHECKOUT",
                                checkout: checkout
                            };
                        }
                    })
                    .catch(console.log);
            } else {
                return client.checkout
                    .create()
                    .then(checkout => {
                        return axios
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
        .get("/get-checkout")
        .then(function({ data }) {
            const checkoutId = data.checkoutId;
            if (data.checkoutId) {
                return client.checkout
                    .removeLineItems(checkoutId, productId)
                    .then(checkout => {
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

export function updateProduct(productInfo) {
    return axios.get("/get-checkout").then(function({ data }) {
        const checkoutId = data.checkoutId;
        let quantity = parseInt(productInfo.quantity);

        const lineItemsToUpdate = [{ id: productInfo.id, quantity: quantity }];

        return client.checkout
            .updateLineItems(checkoutId, lineItemsToUpdate)
            .then(checkout => {
                return {
                    type: "GET_CHECKOUT",
                    checkout: checkout
                };
            });
    });
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

// ===================================================================================== checkout

export function getShop() {
    return client.shop.fetchInfo().then(shop => {});
}

export function showThankYou() {
    return {
        type: "TOGGLE_CART",
        showThankYou: true
    };
}

export function hideThankYou() {
    return {
        type: "TOGGLE_THANK_YOU",
        showThankYou: true
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

// ===================================================================================== World

export function getWorldVinyl() {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzUyNjk3MDcxNjcz";

    return client.collection
        .fetchWithProducts(collectionId)
        .then(collection => {
            return {
                type: "GET_WORLD_VINYL",
                vinyls: collection.products
            };
        })
        .catch(console.log);
}

export function getWorldDigital() {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzU0NDIwMzQwNzkz";

    return client.collection
        .fetchWithProducts(collectionId)
        .then(collection => {
            return {
                type: "GET_WORLD_DIGITAL",
                digital: collection.products
            };
        })
        .catch(console.log);
}

export function getWorldMixes() {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzU0NDIwNDM5MDk3"; //mixes

    return client.collection
        .fetchWithProducts(collectionId)
        .then(collection => {
            return {
                type: "GET_WORLD_MIXES",
                mixes: collection.products
            };
        })
        .catch(console.log);
}

export function getWorldMixtapes() {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzU4Njc5Nzg3NTc3"; //mixtapes

    return client.collection
        .fetchWithProducts(collectionId)
        .then(collection => {
            return {
                type: "GET_WORLD_MIXTAPES",
                mixtapes: collection.products
            };
        })
        .catch(console.log);
}

export function getWorldVideos() {
    return axios.get("/world-videos").then(function({ data }) {
        return {
            type: "GET_WORLD_VIDEOS",
            videos: data.videos
        };
    });
}
