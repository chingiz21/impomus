const SET_IMPORT_TYPE = 'SET_IMPORT_TYPE';

const defaultState = {
    type: 'youtube'
};

export const typeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_IMPORT_TYPE':
            return {...state, type: action.payload};
        default:
            return state;
    }
};

export const setImportType = (type) => ({type: SET_IMPORT_TYPE, payload: type});