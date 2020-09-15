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

export const changeBackgroundImage = (data) => {
    return {
        type: actions.CHANGE_BACKGROUND_IMAGE,
        payload: new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = (function (theFile) {
                var fileName = theFile.name;
                return function (e) {
                    resolve({ name: fileName, base64: e.target.result});
                };
            })(data);
            reader.onerror = error => reject(error);
        })
    }
}

export const removeBackgroundImage = () => {
    return {
        type: actions.REMOVE_BACKGROUND_IMAGE,
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