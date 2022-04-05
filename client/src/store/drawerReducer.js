const SET_VISIBILITY = 'SET_VISIBILITY';
const HIDE_DRAWER = 'HIDE_DRAWER';
const GET_PLAYLIST_INFO = 'GET_PLAYLIST_INFO';

const defaultState = {
    visibility: false,
    playlist: {}
}

export const drawerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VISIBILITY:
            return {...state, visibility: action.payload};
            
        case HIDE_DRAWER:
            return {...state, visibility: action.payload};

        case GET_PLAYLIST_INFO:
            return {...state, playlist: action.payload};
        default:
            return state;
    }
}

export const setVisibleAction = (visibility) => ({type: SET_VISIBILITY, payload: visibility});
export const hideDrawer = (visibility) => ({type: HIDE_DRAWER, payload: visibility});
export const getPlaylist = (playlist) => ({type: GET_PLAYLIST_INFO, payload: playlist});
