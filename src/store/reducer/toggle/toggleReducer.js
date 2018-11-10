import { toggleActions } from '../../action/toggle/toggleActions';

const initialState = {
    toggleLoginSignUp: null,
    checkoutOverlayVisible: false
};

const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case toggleActions.toRegister().type: {
            return { ...state, toggleLoginSignUp: false };
        }
        case toggleActions.toLogin().type: {
            return { ...state, toggleLoginSignUp: true };
        }
        case toggleActions.toggleCart().type: {
            return { ...state, checkoutOverlayVisible: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};

export default toggleReducer;
