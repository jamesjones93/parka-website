import { createActions } from 'redux-actions';

export const toggleActions = createActions({
    TO_REGISTER: () => {},
    TO_LOGIN: () => {},
    TOGGLE_CART: boolean => boolean
});

export const toRegister = () => toggleActions.toRegister();
export const toLogin = () => toggleActions.toLogin();
export const toggleCart = boolean => toggleActions.toggleCart(boolean);