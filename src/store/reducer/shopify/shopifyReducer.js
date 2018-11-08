import { shopifyActions } from '../../action/shopify/shopifyActions';

const initialState = {
    products: [],
    product: {},
    checkoutId: ''
};

const shopifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case shopifyActions.getAllProductsSuccess().type: {
            return { ...state, products: action.payload };
        }
        case shopifyActions.filterProductsSuccess().type: {
            return { ...state, product: action.payload };
        }
        case shopifyActions.getCartSuccess().type: {
            return { ...state, checkoutId: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};

export default shopifyReducer;
