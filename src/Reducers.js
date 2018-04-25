export default function(state = {}, action) {
    if (action.type == "TOGGLE_TO_SIGNUP") {
        state = {
            ...state,
            toggleLoginSignUp: action.toggleLoginSignUp
        };
    } else if (action.type == "TOGGLE_TO_LOGIN") {
        state = {
            ...state,
            toggleLoginSignUp: action.toggleLoginSignUp
        };
    } else if (action.type == "REGISTER_USER") {
        state = {
            ...state,
            releases: action.toggleLoginSignUp
        };
    } else if (action.type == "SIGNUP_SUCCESS") {
        state = {
            ...state,
            success: true
        };
    } else if (action.type == "SIGNUP_USER") {
        state = {
            ...state,
            error: action.error
        };
    }

    return state;
}
