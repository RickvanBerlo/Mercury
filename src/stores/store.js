import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import Promise from 'redux-promise-middleware';
import noteReducer from './notes/noteReducer';
import storageReducer from './storage/storageReducer';

const allReducers = combineReducers({
    noteReducer,
    storageReducer
})

export default createStore(allReducers, applyMiddleware(ReduxThunk, Logger, Promise));
