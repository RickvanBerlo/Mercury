import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Logger from 'redux-logger';
import Promise from 'redux-promise-middleware';
import noteReducer from './notes/noteReducer';
import storageReducer from './storage/storageReducer';
import weblinkReducer from './weblinks/weblinkReducer';
import snackbarReducer from './snackbar/snackbarReducer';
import modelReducer from './models/modelReducer';
import eventReducer from './events/eventReducer';   
import keycloakReducer from './keycloak/keycloakReducer';   
import taskReducer from './tasks/taskReducer';   

const allReducers = combineReducers({
    noteReducer,
    keycloakReducer,
    storageReducer,
    weblinkReducer,
    snackbarReducer,
    modelReducer,
    eventReducer,
    taskReducer,
    
})

export default createStore(allReducers, applyMiddleware(ReduxThunk, Logger, Promise));
