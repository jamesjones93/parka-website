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
    createCartEpic,
    getCartEpic
} from './epic/shopify/shopifyEpic';

import userReducer from './reducer/user/userReducer';
import toggleReducer from './reducer/toggle/toggleReducer';
import parkaReducer from './reducer/parka/parkaReducer';
import shopifyReducer from './reducer/shopify/shopifyReducer';


export const rootEpic = combineEpics(
    checkForCookieEpic,
    checkLoginEpic,
    signUpEpic,
    userLoginEpic,
    resendCodeEpic,
    getAllProductsEpic,
    getDatesEpic,
    getProductEpic,
    filterProductsEpic,
    createCartEpic,
    getCartEpic
);

export const rootReducer = combineReducers({
    userReducer,
    toggleReducer,
    parkaReducer,
    shopifyReducer
});