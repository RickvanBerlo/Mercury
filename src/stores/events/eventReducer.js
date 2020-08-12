import { actions } from './eventActions'
import languageSelector from '../../utils/languageSelector';
import { datediff, parseDateYMD } from '../../utils/date'

//const lookupTable = {};
const InitState = { events: {}, passedEvent: {}, passedEventsOfDay: { timedEvents: [], allDayEvents: [] }, currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), currentDay: new Date().getDate() }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {
    let yearChange;
    switch (action.type) {
        case (actions.ADD_EVENT + fulfilled):
            console.log(action);
            return { ...state };
        case (actions.DELETE_EVENT + fulfilled):
            console.log(action);
            return { ...state };
        case (actions.GET_EVENT + fulfilled):
            console.log(action);
            return { ...state };
        case (actions.GET_EVENTS_OF_MONTH + fulfilled):
            let events = state.events;
            action.payload.forEach((event) => {
                events = addEvent(state.events, event)
            })
            return { ...state, events: { ...events } };
        case (actions.REPLACE_EVENT + fulfilled):
            console.log(action);
            return { ...state };
        case actions.PASS_EVENTS_OF_DAY:
            return { ...state, passedEventsOfDay: { ...action.payload } };
        case actions.PASS_EVENT:
            return { ...state, passedEvent: action.payload };
        case actions.SET_CURRENT_MONTH:
            const index = languageSelector().MONTHS.findIndex((name) => name === action.payload);
            return { ...state, currentMonth: index };
        case actions.SET_CURRENT_DAY:
            return { ...state, currentDay: action.payload };
        case actions.SET_CURRENT_YEAR:
            return { ...state, currentYear: action.payload };
        case actions.SET_NEXT_MONTH:
            yearChange = state.currentMonth === 11;
            return { ...state, currentMonth: state.currentMonth === 11 ? 0 : state.currentMonth + 1, currentYear: yearChange ? state.currentYear + 1 : state.currentYear };
        case actions.SET_PREVIOUS_MONTH:
            yearChange = state.currentMonth === 0;
            return { ...state, currentMonth: state.currentMonth === 0 ? 11 : state.currentMonth - 1, currentYear: yearChange ? state.currentYear - 1 : state.currentYear };
        default:
            return state;
    }
}

const addEvent = (events, event) => {
    event.startDate = `${event.startDate[0]}-${event.startDate[1] < 10 ? "0" + event.startDate[1] : event.startDate[1]}-${event.startDate[2] < 10 ? "0" + event.startDate[2] : event.startDate[2]}`;
    event.endDate = `${event.endDate[0]}-${event.endDate[1] < 10 ? "0" + event.endDate[1] : event.endDate[1]}-${event.endDate[2] < 10 ? "0" + event.endDate[2] : event.endDate[2]}`;
    event.endTime = `${event.endTime[0] < 10 ? "0" + event.endTime[0] : event.endTime[0]}:${event.endTime[1] < 10 ? "0" + event.endTime[1] : event.endTime[1]}`;
    event.startTime = `${event.startTime[0] < 10 ? "0" + event.startTime[0] : event.startTime[0]}:${event.startTime[1] < 10 ? "0" + event.startTime[1] : event.startTime[1]}`;
    placeEventInArray(events, event, event.startDate);
    //if (event.startDate !== event.endDate) placeEventInArray(event, event, event.endDate);
    return events;
}

const placeEventInArray = (events, event, date) => {
    if (event.hasTime) {
        placeTimedEvent(events, event, date);
    } else {
        calculateAllDayEventPlaces(events, event, date);
    }
}

const placeTimedEvent = (events, event, date) => {
    if (events[date] === undefined) {
        events[date] = { offset: 0, timedEvents: [event], allDayEvents: [] }
    } else {
        if (!arrayContainsEvent(event.id, events[date].timedEvents)) events[date].timedEvents.push(event);
    }
}

const calculateAllDayEventPlaces = (events, event, date) => {
    const startDate = parseDateYMD(event.startDate);
    const diffrence = datediff(event.startDate, event.endDate);

    startDate.setDate(startDate.getDate() + 1);
    for (let i = 0; i < diffrence; i++) {
        if (startDate.getDay() === 0) placeAllDayEvent(events, event, startDate.toLocaleDateString("fr-CA"));
        else if (!arrayContainsEvent(event.id, events[date].allDayEvents)) changeOffset(events, startDate.toLocaleDateString("fr-CA"), 1);
        startDate.setDate(startDate.getDate() + 1);
    }

    placeAllDayEvent(events, event, event.startDate);
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