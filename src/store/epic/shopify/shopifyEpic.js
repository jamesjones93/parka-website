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


export const createCartEpic = (action$, store) =>
    action$.ofType(shopifyActions.createCart().type).mergeMap(action =>
        Observable.fromPromise(client.checkout.create()).mergeMap(checkout =>
            Observable.fromPromise(axios.post('/save-checkout-to-cookie', {checkoutId: checkout.id})).mergeMap(resp =>
                Observable.of(shopifyActions.getCartSuccess(checkout.id))
            )
                .catch(error => Observable.of(shopifyActions.createCartFailure(error)))
        )
            .catch(error => Observable.of(shopifyActions.createCartFailure(error)))
    );


export const getCartEpic = (action$, store) =>
    action$.ofType(shopifyActions.getCart().type).mergeMap(action =>
        Observable.fromPromise(axios.get('/get-checkout')).mergeMap(({ data }) => {
            const { checkoutId } = data;

            return checkoutId ? Observable.of(shopifyActions.getCartSuccess(checkoutId)) :
                Observable.of(shopifyActions.createCart(checkoutId));
        })
            .catch(error => Observable.of(shopifyActions.getCartFailure(error)))
    );


// add another epic to fetch the chart using the shopifyAPI

