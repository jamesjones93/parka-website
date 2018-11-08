import { parkaActions } from '../../action/parka/parkaActions';

const initialState = {
    dates: []
};

const parkaReducer = (state = initialState, action) => {
    switch (action.type) {
        case parkaActions.getDatesSuccess().type: {
            return { ...state, dates: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};

export default parkaReducer;
