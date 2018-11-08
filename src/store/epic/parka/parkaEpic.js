import { Observable } from 'rxjs';
import axios from '../../../axios';
import { parkaActions } from '../../action/parka/parkaActions';


export const getDatesEpic = (action$, store) =>
    action$.ofType(parkaActions.getDates().type).mergeMap(action =>
        Observable.fromPromise(axios.get('/get-dates')).mergeMap(({ data }) =>
            Observable.of(parkaActions.getDatesSuccess(data.dates))
        )
            .catch(error => Observable.of(parkaActions.getDatesFailure(error)))
    );