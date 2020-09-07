import actions from './preferencesNames';

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