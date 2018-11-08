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

    CREATE_CART: () => {},
    CREATE_CART_SUCCESS: checkoutId => checkoutId,
    CREATE_CART_FAILURE: error => error,

    GET_CART: () => {},
    GET_CART_SUCCESS: checkoutId => checkoutId,
    GET_CART_FAILURE: error => error,
});

export const getAllProducts = () => shopifyActions.getAllProducts();
export const getProduct = productId => shopifyActions.getProduct(productId);
export const getCart = productId => shopifyActions.getCart(productId);
