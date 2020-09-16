import actions from './eventNames';
import { datediff, parseDateYMD } from '../../utils/date';

const InitState = { events: {}, passedEvent: {}, passedEventsOfDay: { timedEvents: [], allDayEvents: [] } }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {
    let events;
    switch (action.type) {
        case (actions.ADD_EVENT + fulfilled):
            events = addEvent(state.events, action.payload);
            return { ...state, events: { ...events } };
        case (actions.DELETE_EVENT + fulfilled):
            events = deleteEvent(state.events, state.passedEvent);
            return { ...state, events: { ...events } };
        case (actions.GET_EVENT + fulfilled):
            return { ...state };
        case (actions.GET_EVENTS_OF_MONTH + fulfilled):
            events = state.events;
            action.payload.forEach((event) => {
                events = addEvent(state.events, event);
            })
            return { ...state, events: { ...events } };
        case (actions.REPLACE_EVENT + fulfilled):
            events = replaceEvent(state.events, action.payload, state.passedEvent);
            return { ...state, events: { ...events } };
        case actions.PASS_EVENT:
            return { ...state, passedEvent: action.payload };
        default:
            return state;
    }
}

const replaceEvent = (events, newEvent, oldEvent) => {
    deleteEvent(events, oldEvent);
    addEvent(events, newEvent);
    return events;
}

const addEvent = (events, event) => {
    event.startDate = `${event.startDate[0]}-${event.startDate[1] < 10 ? "0" + event.startDate[1] : event.startDate[1]}-${event.startDate[2] < 10 ? "0" + event.startDate[2] : event.startDate[2]}`;
    event.endDate = `${event.endDate[0]}-${event.endDate[1] < 10 ? "0" + event.endDate[1] : event.endDate[1]}-${event.endDate[2] < 10 ? "0" + event.endDate[2] : event.endDate[2]}`;
    event.endTime = `${event.endTime[0] < 10 ? "0" + event.endTime[0] : event.endTime[0]}:${event.endTime[1] < 10 ? "0" + event.endTime[1] : event.endTime[1]}`;
    event.startTime = `${event.startTime[0] < 10 ? "0" + event.startTime[0] : event.startTime[0]}:${event.startTime[1] < 10 ? "0" + event.startTime[1] : event.startTime[1]}`;
    placeEventInArray(events, event);
    return events;
}

const deleteEvent = (events, event) => {
    if (event.hasTime) {
        deleteTimedEvent(events, event);
    } else {
        calculateAllDayEventPlaces(events, event, false);
    }
    return events;
}

const deleteTimedEvent = (events, event) => {
    const filterdEvents = events[event.startDate].timedEvents.filter((storedEvent) => { return storedEvent.id !== event.id });
    events[event.startDate].timedEvents = filterdEvents;
}

const placeEventInArray = (events, event) => {
    if (event.hasTime) {
        placeTimedEvent(events, event);
    } else {
        calculateAllDayEventPlaces(events, event, true);
    }
}

const placeTimedEvent = (events, event) => {
    if (events[event.startDate] === undefined) {
        events[event.startDate] = { offset: 0, timedEvents: [event], allDayEvents: [] }
    } else {
        if (!arrayContainsEvent(event.id, events[event.startDate].timedEvents)) events[event.startDate].timedEvents.push(event);
    }
}

const calculateAllDayEventPlaces = (events, event, addTrue_DeleteFalse) => {
    const startDate = parseDateYMD(event.startDate);
    const diffrence = datediff(event.startDate, event.endDate);

    startDate.setDate(startDate.getDate() + 1);
    for (let i = 0; i < diffrence; i++) {
        if (startDate.getDay() === 0) {
            if (addTrue_DeleteFalse) placeAllDayEvent(events, event, startDate.toLocaleDateString("fr-CA"));
            else removeAllDayEvent(events, event, startDate.toLocaleDateString("fr-CA"));
        } else {
            if ((events[event.startDate] === undefined && addTrue_DeleteFalse) || (!arrayContainsEvent(event.id, events[event.startDate].allDayEvents) && addTrue_DeleteFalse)) {
                changeOffset(events, startDate.toLocaleDateString("fr-CA"), 1);
            } else if (arrayContainsEvent(event.id, events[event.startDate].allDayEvents) && !addTrue_DeleteFalse) {
                changeOffset(events, startDate.toLocaleDateString("fr-CA"), -1);
            }
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    if (addTrue_DeleteFalse) placeAllDayEvent(events, event, event.startDate);
    else removeAllDayEvent(events, event, event.startDate);
}

const removeAllDayEvent = (events, event, date) => {
    const filterdEvents = events[date].allDayEvents.filter((storedEvent) => { return storedEvent.id !== event.id });
    events[date].allDayEvents = filterdEvents;
}

const placeAllDayEvent = (events, event, date) => {
    if (events[date] === undefined) {
        events[date] = { offset: 0, timedEvents: [], allDayEvents: [event] }
    } else {
        if (!arrayContainsEvent(event.id, events[date].allDayEvents)) events[date].allDayEvents.push(event);
    }
}

const changeOffset = (events, date, amount) => {
    if (events[date] === undefined) {
        events[date] = { offset: amount, timedEvents: [], allDayEvents: [] }
    } else {
        events[date].offset += amount;
    }
}

const arrayContainsEvent = (id, events) => {
    const length = events.filter((item) => {
        return item.id === id;
    }).length;

    if (length > 0) return true;
    return false;
}