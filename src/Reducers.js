export default function(state = {}, action) {
    if (action.type === "CHECK_LOGIN") {
        state = {
            ...state,
            user: action.user
        };
    } else if (action.type === "TOGGLE_TO_SIGNUP") {
        state = {
            ...state,
            toggleLoginSignUp: action.toggleLoginSignUp
        };
    } else if (action.type === "TOGGLE_TO_LOGIN") {
        state = {
            ...state,
            toggleLoginSignUp: action.toggleLoginSignUp
        };
    } else if (action.type === "REGISTER_USER") {
        state = {
            ...state,
            releases: action.toggleLoginSignUp
        };
    } else if (action.type === "SIGNUP_SUCCESS") {
        console.log("ACTION", action);
        state = {
            ...state,
            user: action.user
        };
    } else if (action.type === "SIGNUP_ERROR") {
        state = {
            ...state,
            error: action.error
        };
    } else if (action.type === "LOGIN_ERROR") {
        state = {
            ...state,
            error: action.error
        };
    } else if (action.type === "LOGIN_SUCCESS") {
        state = {
            ...state,
            user: action.user
        };
    } else if (action.type === "GET_RECORDS") {
        console.log("action:", action);
        state = {
            ...state,
            records: action.records
        };
    }

    return state;
}
