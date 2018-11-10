import { Observable } from 'rxjs';
import axios from '../../../axios';
import { userActions } from '../../action/user/userActions';


export const checkForCookieEpic = (action$, store) =>
    action$.ofType(userActions.checkForCookie().type).mergeMap(action =>
        Observable.fromPromise(axios.get('/check-for-cookie')).mergeMap(({ data }) =>
                Observable.of(userActions.checkForCookieSuccess(data.cookie))
            )
            .catch(error => Observable.of(userActions.checkForCookieFailure(error)))
    );


export const checkLoginEpic = (action$, store) =>
    action$.ofType(userActions.checkLogin().type).mergeMap(action =>
        Observable.fromPromise(axios.get('/check-login')).mergeMap(({ data }) =>
            Observable.of(userActions.checkLoginSuccess(data.user))
        )
            .catch(error => Observable.of(userActions.checkLoginFailure(error)))
    );


export const signUpEpic = (action$, store) =>
    action$.ofType(userActions.signUp().type).mergeMap(action =>
         Observable.fromPromise(axios.post('/register-user', action.payload)).mergeMap(({ data }) => {
            if (data.user) {
                location.pathname = '/world';
                return Observable.of(userActions.signUpSuccess(true));
            } else {
                return Observable.of(userActions.signUpFailure(data.error));
            }
        })
            .catch(error => Observable.of(userActions.signUpFailure(error)))
    );


export const userLoginEpic = (action$, store) =>
    action$.ofType(userActions.userLogin().type).mergeMap(action =>
        Observable.fromPromise(axios.post('/user-login', action.payload)).mergeMap(({ data }) => {
            if (data.error) {
                return Observable.of(userActions.userLoginFailure(data.error))
            } else {
                location.pathname = '/world';
                return Observable.of(userActions.userLoginSuccess(true));
            }
        })
            .catch(error => Observable.of(userActions.userLoginFailure(error)))
    );


export const resendCodeEpic = (action$, store) =>
    action$.ofType(userActions.userLogin().type).mergeMap(action =>
        Observable.fromPromise(axios.post('/resend-code', action.payload)).mergeMap(({ data }) => {
            location.pathname = '/';
            return Observable.of(userActions.resendCodeSuccess(true))
        })
            .catch(error => Observable.of(userActions.userLoginFailure(error)))
    );




