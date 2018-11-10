import { Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import Client from "shopify-buy";
import { shopifyActions } from "../../action/shopify/shopifyActions";
import axios from "../../../axios";

const client = Client.buildClient({
    domain: "parka-records.myshopify.com",
    storefrontAccessToken: "e3b25dce26eb25d4dd3595fd82ecb0ad"
});


export const getAllProductsEpic = (action$, store) =>
    action$.ofType(shopifyActions.getAllProducts().type).mergeMap(action =>
        Observable.fromPromise(client.product.fetchAll()).mergeMap(products => {
            products.reverse();

            const filterProducts = action.payload ?
                Observable.of(shopifyActions.filterProducts({ productInfo: action.payload, products })) :
                Observable.empty();

            return Observable.concat(
                Observable.of(shopifyActions.getAllProductsSuccess(products)),
                filterProducts
            )
        })
            .catch(error => Observable.of(shopifyActions.getAllProducts(error)))
    );


export const getProductEpic = (action$, store) =>
    action$.ofType(shopifyActions.getProduct().type).mergeMap(action => {
        const state = store.getState();
        const products = state.shopifyReducer.products;

        return products.length ?
            Observable.of(shopifyActions.filterProducts({ productInfo: action.payload, products })) :
            Observable.of(shopifyActions.getAllProducts(action.payload));
    })
        .catch(error => Observable.of(shopifyActions.getAllProducts(error)));


export const filterProductsEpic = (action$, store) =>
    action$.ofType(shopifyActions.filterProducts().type).mergeMap(action => {
        const { productInfo, products } = action.payload;
        const product = products.filter(product => product.handle === productInfo)[0];

        return Observable.of(shopifyActions.filterProductsSuccess(product));
    })
        .catch(error => Observable.of(shopifyActions.filterProductsFailure(error)));


export const createCheckoutEpic = (action$, store) =>
    action$.ofType(shopifyActions.createCheckout().type).mergeMap(action =>
        Observable.fromPromise(client.checkout.create()).mergeMap(checkout =>
            Observable.of(shopifyActions.saveCheckoutToCookie(checkout.id))
        )
            .catch(error => Observable.of(shopifyActions.createCheckoutFailure(error)))
    );


export const saveCheckoutToCookie = (action$, store) =>
    action$.ofType(shopifyActions.saveCheckoutToCookie().type).mergeMap(action =>
        Observable.fromPromise(axios.post('/save-checkout-to-cookie', { checkoutId: action.payload })).mergeMap(resp =>
            Observable.of(shopifyActions.updateCheckout(action.payload))
        )
            .catch(error => Observable.of(shopifyActions.saveCheckoutToCookieFailure(error)))
    );


export const getCheckoutEpic = (action$, store) =>
    action$.ofType(shopifyActions.getCheckout().type).mergeMap(action =>
        Observable.fromPromise(axios.get('/get-checkout')).mergeMap(({ data }) => {
            const { checkoutId } = data;

            return checkoutId ? Observable.concat(
                Observable.of(shopifyActions.fetchCheckout(checkoutId)),
                Observable.of(shopifyActions.getCheckoutSuccess(checkoutId))
            ) : Observable.of(shopifyActions.createCheckout(checkoutId));
        })
            .catch(error => Observable.of(shopifyActions.getCheckoutFailure(error)))
    );


export const fetchCheckoutEpic = (action$, store) =>
    action$.ofType(shopifyActions.fetchCheckout().type).mergeMap(action =>
        Observable.fromPromise(client.checkout.fetch(action.payload)).mergeMap(checkout =>
            Observable.of(shopifyActions.updateCheckout(checkout))
        )
            .catch(error => Observable.of(shopifyActions.fetchCheckoutFailure(error)))
    );


export const addToCheckoutEpic = (action$, store) =>
    action$.ofType(shopifyActions.addToCheckout().type).mergeMap(action => {
        const state = store.getState();
        const checkoutId = state.shopifyReducer.checkoutId;
        const lineItemsToAdd = [action.payload];

        return Observable.fromPromise(client.checkout.addLineItems(checkoutId, lineItemsToAdd)).mergeMap(checkout =>
            Observable.of(shopifyActions.updateCheckout(checkout))
        )
            .catch(error => Observable.of(shopifyActions.addToCheckoutFailure(error)))
    });


export const removeFromCheckoutEpic = (action$, store) =>
    action$.ofType(shopifyActions.removeFromCheckout().type).mergeMap(action => {
        const state = store.getState();
        const checkoutId = state.shopifyReducer.checkoutId;
        const productId = action.payload;

        return Observable.fromPromise(client.checkout.removeLineItems(checkoutId, productId)).mergeMap(checkout =>
            Observable.of(shopifyActions.updateCheckout(checkout))
        )
            .catch(error => Observable.of(shopifyActions.removeFromCheckoutFailure(error)))
    });



export const updateProductInCheckoutEpic = (action$, store) =>
    action$.ofType(shopifyActions.updateProductInCheckout().type).mergeMap(action => {
        const state = store.getState();
        const checkoutId = state.shopifyReducer.checkoutId;
        const lineItemsToUpdate = [action.payload];

        return Observable.fromPromise(client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)).mergeMap(checkout =>
            Observable.of(shopifyActions.updateCheckout(checkout))
        )
            .catch(error => Observable.of(shopifyActions.updateProductInCheckoutFailure(error)))
    });