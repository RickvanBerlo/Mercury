import actions from './preferencesNames';
import * as database from '../../databases/preferences';

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
    return {
        type: actions.SAVE_PREFERENCES,
        payload: database.savePreferences(preferences)
    }
}