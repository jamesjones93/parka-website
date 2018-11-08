import { createActions } from 'redux-actions';

export const parkaActions = createActions({
    GET_DATES: () => {},
    GET_DATES_SUCCESS: boolean => boolean,
    GET_DATES_FAILURE: error => error,

});

export const getDates = () => parkaActions.getDates();



