import * as database from '../../databases/notes';

export const actions = {
    ADD_MESSAGE: "ADD_MESSAGE",
    POP_MESSAGE: "POP_MESSAGE",
    SET_TIME: "SET_TIME",
}

export const addMessage = (message) => {
    return {
        type: actions.ADD_MESSAGE,
        payload: message
    }
}

export const removeMessage = (message) => {
    return {
        type: actions.POP_MESSAGE,
        payload: message
    }
}

export const setTimeInSeconds = (time) => {
    return {
        type: actions.SET_TIME,
        payload: time
    }
}