import { actions } from './eventActions'
import languageSelector from '../../utils/languageSelector';

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
            console.log(action);
            return { ...state };
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