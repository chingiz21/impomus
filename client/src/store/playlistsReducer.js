const SET_USER_PLAYLISTS = 'SET_USER_PLAYLISTS';

const defaultState = {
    playlist: []
};

export const playlistsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_PLAYLISTS:
            return {...state, playlist: action.payload}
        default:
            return state;
    }
};

export const setUserPlaylists = (playlists) => ({type: SET_USER_PLAYLISTS, payload: playlists});