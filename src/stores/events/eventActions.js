import * as database from '../../databases/events';

export const actions = {
    ADD_EVENT: "ADD_EVENT",
    DELETE_EVENT: "DELETE_EVENT",
    REPLACE_EVENT: "REPLACE_EVENT",
    GET_EVENTS_OF_MONTH: "GET_EVENTS_OF_MONTH",
    GET_EVENT: "GET_EVENT",
    PASS_EVENTS_OF_DAY: "PASS_EVENTS_OF_DAY",
    PASS_EVENT: "PASS_EVENT",
    SET_CURRENT_MONTH: "SET_CURRENT_MONTH",
    SET_CURRENT_YEAR: "SET_CURRENT_YEAR",
    SET_NEXT_MONTH: "SET_NEXT_MONTH",
    SET_PREVIOUS_MONTH: "SET_PREVIOUS_MONTH",
    SET_CURRENT_DAY: "SET_CURRENT_DAY"
}

export const addEvent = (event) => {
    return {
        type: actions.ADD_EVENT,
        payload: database.addEvent(event).then(response => response.json())
    }
}

export const deleteEvent = (id) => {
    return {
        type: actions.DELETE_EVENT,
        payload: database.deleteEvent(id).then(response => response.json())
    }
}

export const replaceEvent = (event) => {
    return {
        type: actions.REPLACE_EVENT,
        payload: database.replaceEvent(event).then(response => response.json())
    }
}

export const getEvent = (id) => {
    return {
        type: actions.GET_EVENT,
        payload: database.getEvent(id).then(response => response.json())
    }
}

export const getEventsOfMonth = (month) => {
    return {
        type: actions.GET_EVENTS_OF_MONTH,
        payload: database.getEventsOfMonth(month).then(response => response.json())
    }
}

export const passEventsOfDay = (timedEvents, allDayEvents) => {
    return {
        type: actions.PASS_EVENTS_OF_DAY,
        payload: { timedEvents, allDayEvents }
    }
}

export const passEvent = (event) => {
    return {
        type: actions.PASS_EVENT,
        payload: event
    }
}

export const setCurrentYear = (year) => {
    return {
        type: actions.SET_CURRENT_YEAR,
        payload: year
    }
}

export const setCurrentMonth = (month) => {
    return {
        type: actions.SET_CURRENT_MONTH,
        payload: month
    }
}

export const setCurrentDay = (day) => {
    return {
        type: actions.SET_CURRENT_DAY,
        payload: day
    }
}

export const setNextMonth = () => {
    return {
        type: actions.SET_NEXT_MONTH,
    }
}


export const setPreviousMonth = () => {
    return {
        type: actions.SET_PREVIOUS_MONTH,
    }
}
