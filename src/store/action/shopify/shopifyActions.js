import { createActions } from 'redux-actions';

export const shopifyActions = createActions({
    GET_ALL_PRODUCTS: productInfo => productInfo,
    GET_ALL_PRODUCTS_SUCCESS: products => products,
    GET_ALL_PRODUCTS_FAILURE: error => error,

    GET_PRODUCT: productId => productId,
    GET_PRODUCT_SUCCESS: product => product,
    GET_PRODUCT_FAILURE: error => error,

    FILTER_PRODUCTS: products => products,
    FILTER_PRODUCTS_SUCCESS: product => product,
    FILTER_PRODUCTS_FAILURE: error => error,

    CREATE_CHECKOUT: () => {},
    CREATE_CHECKOUT_SUCCESS: checkoutId => checkoutId,
    CREATE_CHECKOUT_FAILURE: error => error,

    SAVE_CHECKOUT_TO_COOKIE: checkoutId => checkoutId,
    SAVE_CHECKOUT_TO_COOKIE_SUCCESS: checkoutId => checkoutId,
    SAVE_CHECKOUT_TO_COOKIE_FAILURE: error => error,

    GET_CHECKOUT: () => {},
    GET_CHECKOUT_SUCCESS: checkoutId => checkoutId,
    GET_CHECKOUT_FAILURE: error => error,

    FETCH_CHECKOUT: checkoutId => checkoutId,
    FETCH_CHECKOUT_SUCCESS: checkoutId => checkoutId,
    FETCH_CHECKOUT_FAILURE: checkoutId => checkoutId,

    ADD_TO_CHECKOUT: product => product,
    ADD_TO_CHECKOUT_FAILURE: error => error,

    UPDATE_CHECKOUT: CHECKOUT => CHECKOUT,

    REMOVE_FROM_CHECKOUT: product => product,
    REMOVE_FROM_CHECKOUT_ERROR: error => error,

    UPDATE_PRODUCT_IN_CHECKOUT: product => product,
    UPDATE_PRODUCT_IN_CHECKOUT_FAILURE: product => product,


});

export const getAllProducts = () => shopifyActions.getAllProducts();
export const getProduct = productId => shopifyActions.getProduct(productId);
export const getCheckout = productId => shopifyActions.getCheckout(productId);
export const addToCheckout = productInfo => shopifyActions.addToCheckout(productInfo);
export const removeFromCheckout = product => shopifyActions.removeFromCheckout(product);
export const updateProductInCheckout = product => shopifyActions.updateProductInCheckout(product);
