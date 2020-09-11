import actions from './preferencesNames';
import * as database from '../../databases/preferences';
import { darkBackground, lightBackground } from '../../constants/colors';

export const changeClock = (bool) => {
    return {
        type: actions.CHANGE_CLOCK,
        payload: bool
    }
}

export const changeDarkmode = (bool) => {
    return {
        type: actions.CHANGE_DARKMODE,
        payload: bool
    }
}

export const getPreferences = () => {
    return {
        type: actions.GET_PREFERENCES,
        payload: database.getPreferences().then(response => response.json())
    }
}

export const savePreferences = (preferences) => {
    window.localStorage.setItem(window.location.origin, JSON.stringify(
        preferences.darkmode ? { ...preferences, colors: { ...darkBackground, MAIN: "#3ba4a3" } } : { ...preferences, colors: { ...lightBackground, MAIN: "#3ba4a3" } }
        )
    );
    return {
        type: actions.SAVE_PREFERENCES,
        payload: database.savePreferences(preferences)
    }
}