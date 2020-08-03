import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import Promise from 'redux-promise-middleware';
import noteReducer from './notes/noteReducer';

const allReducers = combineReducers({
    noteReducer
})

export default createStore(allReducers, applyMiddleware(ReduxThunk, Logger, Promise));
