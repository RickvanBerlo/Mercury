import actions from './preferencesNames';

const InitState = { clock: false, darkmode: false }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {

    switch (action.type) {
        case actions.CHANGE_DARKMODE:
            return { ...state, darkmode: action.payload }
        case actions.CHANGE_CLOCK:
            return { ...state , clock: action.payload}
        case actions.GET_PREFERENCES + fulfilled:
            return { ...action.payload }
        default:
            return state;
    }
}