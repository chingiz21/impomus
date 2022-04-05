import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';
import { drawerReducer } from './drawerReducer';
import { playlistsReducer } from './playlistsReducer';
import { tokenReducer } from './tokenReducer';
import { typeReducer } from './typeReducer';

const rootReducer = combineReducers({
    token: tokenReducer,
    buttonVisibility: drawerReducer,
    userPlaylists: playlistsReducer,
    importType: typeReducer
})


export const store = createStore(rootReducer, composeWithDevTools());