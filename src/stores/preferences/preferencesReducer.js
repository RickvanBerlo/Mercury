import actions from './preferencesNames';
import objectIsEmpty from '../../utils/objectIsEmpty';
import { darkBackground, lightBackground } from '../../constants/colors';

const InitState = () => {
    const preferences = JSON.parse(window.localStorage.getItem(window.location.origin));
    if (objectIsEmpty(preferences)){
        return { clock: false, darkmode: false, colors: { ...lightBackground, MAIN: "#3ba4a3" } }
    } 
    return { ...preferences, colors: preferences.darkmode ? { ...darkBackground, MAIN: "#3ba4a3" } : { ...lightBackground, MAIN: "#3ba4a3" } };
}

const fulfilled = "_FULFILLED";

export default (state = InitState(), action) => {

    switch (action.type) {
        case actions.CHANGE_DARKMODE:
            const colors = action.payload ? { ...darkBackground, MAIN: state.colors.MAIN } : { ...lightBackground, MAIN: state.colors.MAIN };
            return { ...state, darkmode: action.payload, colors: colors }
        case actions.CHANGE_CLOCK:
            return { ...state , clock: action.payload}
        case actions.GET_PREFERENCES + fulfilled:
            window.localStorage.setItem(window.location.origin, JSON.stringify(action.payload));
            return { ...action.payload, colors: { ...lightBackground, MAIN: "#3ba4a3" } }
        default:
            return state;
    }
}