import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import Promise from 'redux-promise-middleware';
import noteReducer from './notes/noteReducer';
import storageReducer from './storage/storageReducer';
import weblinkReducer from './weblinks/weblinkReducer';
import snackbarReducer from './snackbar/snackbarReducer';
import modelReducer from './models/modelReducer';

const allReducers = combineReducers({
    noteReducer,
    storageReducer,
    weblinkReducer,
    snackbarReducer,
    modelReducer
})

export default createStore(allReducers, applyMiddleware(ReduxThunk, Logger, Promise));
