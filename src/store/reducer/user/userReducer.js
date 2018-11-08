import { userActions } from '../../action/user/userActions';

const initialState = {
    cookie: false,
    signUpSuccess: false,
    error: null,
    redirectToHome: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.checkForCookieSuccess().type: {
            return { ...state, cookie: action.payload };
        }
        case userActions.signUpSuccess().type: {
            return { ...state, signUpSuccess: true };
        }
        case userActions.signUpFailure().type: {
            return { ...state, error: action.payload };
        }
        case userActions.resendCodeSuccess().type: {
            return { ...state, redirectToHome: true }
        }
        default: {
            return { ...state };
        }
    }
};

export default userReducer;
