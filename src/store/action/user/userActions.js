import { createActions } from 'redux-actions';

export const userActions = createActions({
    CHECK_FOR_COOKIE: () => {},
    CHECK_FOR_COOKIE_SUCCESS: boolean => boolean,
    CHECK_FOR_COOKIE_FAILURE: error => error,

    CHECK_LOGIN: () => {},
    CHECK_LOGIN_SUCCESS: userDetails => userDetails,
    CHECK_LOGIN_FAILURE: error => error,

    SIGN_UP: userDetails => userDetails,
    SIGN_UP_SUCCESS: userDetails => userDetails,
    SIGN_UP_FAILURE: error => error,

    USER_LOGIN: userDetails => userDetails,
    USER_LOGIN_SUCCESS: userDetails => userDetails,
    USER_LOGIN_FAILURE: error => error,

    RESEND_CODE: email => email,
    RESEND_CODE_SUCCESS: boolean => boolean,
    RESEND_CODE_FAILURE: error => error
});

export const checkForCookie = () => userActions.checkForCookie();
export const checkLogin = () => userActions.checkLogin();
export const signUp = userDetails => userActions.signUp(userDetails);
export const userLogin = userDetails => userActions.userLogin(userDetails);
export const resendCode = email => userActions.resendCode(email);


