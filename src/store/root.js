import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import {
    checkForCookieEpic,
    checkLoginEpic,
    signUpEpic,
    userLoginEpic,
    resendCodeEpic
} from './epic/user/userEpic';

import {
    getDatesEpic
} from './epic/parka/parkaEpic';

import {
    getAllProductsEpic,
    getProductEpic,
    filterProductsEpic,
    createCheckoutEpic,
    getCheckoutEpic,
    fetchCheckoutEpic,
    saveCheckoutToCookie,
    addToCheckoutEpic,
    removeFromCheckoutEpic,
    updateProductInCheckoutEpic
} from './epic/shopify/shopifyEpic';

import userReducer from './reducer/user/userReducer';
import toggleReducer from './reducer/toggle/toggleReducer';
import parkaReducer from './reducer/parka/parkaReducer';
import shopifyReducer from './reducer/shopify/shopifyReducer';


export const rootEpic = combineEpics(
    // parka epic
    checkForCookieEpic,
    checkLoginEpic,
    signUpEpic,
    userLoginEpic,
    resendCodeEpic,

    // shopify epic
    getAllProductsEpic,
    getDatesEpic,
    getProductEpic,
    filterProductsEpic,
    createCheckoutEpic,
    getCheckoutEpic,
    fetchCheckoutEpic,
    saveCheckoutToCookie,
    addToCheckoutEpic,
    removeFromCheckoutEpic,
    updateProductInCheckoutEpic
);

export const rootReducer = combineReducers({
    userReducer,
    toggleReducer,
    parkaReducer,
    shopifyReducer
});