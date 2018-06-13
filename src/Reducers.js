export default function(state = {}, action) {
    if (action.type === "COOKIE_SUCCESS") {
        state = {
            ...state,
            cookie: true
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
        state = {
            ...state,
            signUpSuccess: true
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
    } else if (action.type === "GET_PRODUCTS") {
        state = {
            ...state,
            products: action.products
        };
    } else if (action.type === "GET_RECORDS") {
        state = {
            ...state,
            records: action.records
        };
    } else if (action.type === "GET_PRODUCT") {
        state = {
            ...state,
            product: action.product
        };
    } else if (action.type === "TOGGLE_CART") {
        state = {
            ...state,
            showCart: action.showCart
        };
    } else if (action.type === "GET_CHECKOUT") {
        state = {
            ...state,
            checkout: action.checkout
        };
    } else if (action.type === "NO_CART") {
        state = {
            ...state,
            noCheckout: action.noCheckout
        };
    } else if (action.type === "GET_DATES") {
        state = {
            ...state,
            dates: action.dates
        };
    } else if (action.type === "GET_WORLD_VINYL") {
        state = {
            ...state,
            vinyls: action.vinyls
        };
    }

    return state;
}
