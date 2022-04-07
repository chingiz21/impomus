const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const GET_YOUTUBE_TOKEN = ' GET_YOUTUBE_TOKEN';

const defaultState = {
    access_token: 'Default state of token'
};

export const tokenReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_ACCESS_TOKEN:
            return {...state, access_token: action.payload};
        case GET_YOUTUBE_TOKEN:
            return {...state, youtube_token: action.payload};
        default:
            return state;
    }
};

export const getYoutubeToken = (token) => ({type: GET_YOUTUBE_TOKEN, payload: token});
export const setToken = (token) => ({type: GET_ACCESS_TOKEN, payload: token})