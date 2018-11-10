import { shopifyActions } from '../../action/shopify/shopifyActions';

const initialState = {
    products: [],
    product: {},
    checkoutId: '',
    checkout: {}
};

const shopifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case shopifyActions.getAllProductsSuccess().type: {
            return { ...state, products: action.payload };
        }
        case shopifyActions.filterProductsSuccess().type: {
            return { ...state, product: action.payload };
        }
        case shopifyActions.getCheckoutSuccess().type: {
            return { ...state, checkoutId: action.payload }
        }
        case shopifyActions.updateCheckout().type: {
            return { ...state, checkout: action.payload }
        }
        default: {
            return { ...state };
        }
    }
};

export default shopifyReducer;
