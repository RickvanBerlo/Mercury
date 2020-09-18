import actions from './eventNames';
import { datediff, parseDateYMD } from '../../utils/date';
import objectIsEmpty from '../../utils/objectIsEmpty';

const InitState = { events: {}, layout:{} , passedEvent: {}, }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {
    let newState;
    switch (action.type) {
        case (actions.ADD_EVENT + fulfilled):
            newState = addEvent(state, action.payload);
            return { ...state, events: { ...newState.events }, layout: { ...newState.layout } };
        case (actions.DELETE_EVENT + fulfilled):
            newState = deleteEvent(state, state.passedEvent);
            return { ...state, events: { ...newState.events }, layout: { ...newState.layout } };
        case (actions.GET_EVENT + fulfilled):
            return { ...state };
        case (actions.GET_EVENTS_OF_MONTH + fulfilled):
            newState = { ...state }
            action.payload.forEach((event) => {
                newState = addEvent(newState, event);
            })
            return { ...state, events: {...newState.events }, layout: {...newState.layout} };
        case (actions.REPLACE_EVENT + fulfilled):
            newState = replaceEvent(state, action.payload, state.passedEvent);
            return { ...state, events: { ...newState.events }, layout: { ...newState.layout } };
        case actions.PASS_EVENT:
            return { ...state, passedEvent: action.payload };
        default:
            return state;
    }
}

const replaceEvent = (state, newEvent, oldEvent) => {
    deleteEvent(state, oldEvent);
    addEvent(state, newEvent);
    return state;
}

const addEvent = (state, event) => {
    event.startDate = `${event.startDate[0]}-${event.startDate[1] < 10 ? "0" + event.startDate[1] : event.startDate[1]}-${event.startDate[2] < 10 ? "0" + event.startDate[2] : event.startDate[2]}`;
    event.endDate = `${event.endDate[0]}-${event.endDate[1] < 10 ? "0" + event.endDate[1] : event.endDate[1]}-${event.endDate[2] < 10 ? "0" + event.endDate[2] : event.endDate[2]}`;
    event.endTime = `${event.endTime[0] < 10 ? "0" + event.endTime[0] : event.endTime[0]}:${event.endTime[1] < 10 ? "0" + event.endTime[1] : event.endTime[1]}`;
    event.startTime = `${event.startTime[0] < 10 ? "0" + event.startTime[0] : event.startTime[0]}:${event.startTime[1] < 10 ? "0" + event.startTime[1] : event.startTime[1]}`;
    //check if the object already exists in the events array. if it doesn't place it in the layout.
    if (state.events[event.id] === undefined){
        state.events[event.id] = event;
        sortLayout(state, event);
    }
    state.events[event.id] = event;
    return state;
}

const deleteEvent = (state, event) => {
    sortLayout(state, event, true);
    delete state.events[event.id];
    return state;
}

const sortLayout = (state, event, del = false) => {
    const startDate = parseDateYMD(event.startDate);
    let difference = datediff(event.startDate, event.endDate);
    for (let i = 0; i <= difference; i++) {
        const key = startDate.toLocaleDateString("fr-CA");
        if (state.layout[key] === undefined) state.layout[key] = {};
        //when the new event date is smaller then the current date change event to undifined. this will sort the list without adding the new event.
        if (new Date(event.endDate).getTime() < startDate.getTime())
            state.layout[key] = orderList(state.events, state.layout, key);
        else 
            state.layout[key] = orderList(state.events, state.layout, key, event, del);
        //change difference to last knows date in list;
        difference = datediff(event.startDate, getLastKnownDate(state.events ,state.layout[key], event))
        //up date by one
        startDate.setDate(startDate.getDate() + 1);
    }
}

const getLastKnownDate = (events, list, event) => {
    let lastKnownDate = new Date(event.endDate).toLocaleDateString("fr-CA");
    for (const index in list) {
        if (new Date(events[list[index]].endDate).getTime() > new Date(lastKnownDate).getTime())
            lastKnownDate = events[list[index]].endDate;
    }
    return lastKnownDate;
}

const orderList = (events, layout, key, event = undefined, del) => {
    let orderedList = {};
    const subtractLayout = { ...layout[key] };

    if(event !== undefined)
    subtractLayout["new"] = event.id;

    //get key for previous day.
    const yesterday = new Date(key);
    yesterday.setDate(yesterday.getDate() - 1);
    const perviousKey = yesterday.toLocaleDateString("fr-CA");

    let amountOfItems = 0;

    if (event !== undefined)
    layout[key]["new"] = event.id;

    for (const index in layout[key]){
        amountOfItems++;
        const eventOfIndex = events[layout[key][index]];
        //delete event is del is true
        if(del && event !== undefined && eventOfIndex.id === event.id){
            delete layout[key][index];
            delete subtractLayout[index];
            amountOfItems--;
        }
        //check if events startdate is prior then the key
        if (new Date(eventOfIndex.startDate).getTime() < new Date(key).getTime()) {
            for (const index2 in layout[perviousKey]) {
                //place event on same place as day before
                if (layout[perviousKey][index2] === layout[key][index]){ 
                    orderedList[index2] = layout[key][index];
                    delete layout[key][index];
                    delete subtractLayout[index];
                    amountOfItems--;
                }
            }

        }
    }
    for (let i = 0; i < amountOfItems; i++){
        //orderedlist has max_safe_interger amount of slots.
        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
            //loop over orderedlist to find first empty slot.
            if (orderedList[i] === undefined) {
                let smallestIndex;
                //second loop over layout[today].
                for (const index in subtractLayout) {
                    //do not check if you are comparing yourself.
                    if (index !== smallestIndex) {
                        const a = smallestIndex === undefined ? { startDate: key, endDate: key, startTime: "24:00" } : events[layout[key][smallestIndex]];
                        const b = events[layout[key][index]];
                        //check for length of days. larger amount of days will be place first in array
                        if (datediff(a.startDate, a.endDate) < datediff(b.startDate, b.endDate)) {
                            smallestIndex = index;
                        }
                        else if (datediff(a.startDate, a.endDate) === datediff(b.startDate, b.endDate)) {
                            //check time. the earliest time will be placed first in the array.
                            if (a.startTime.localeCompare(b.startTime) > 0) {
                                smallestIndex = index;
                            }
                        }
                    }
                }
                orderedList[i] = layout[key][smallestIndex];
                delete subtractLayout[smallestIndex];
                break;
            }
        }
    }
    //when deleting a event we do not need to put it back in
    if (objectIsEmpty(orderedList) && !del) {
        //if orderedList is empty place in first slot
        orderedList[0] = layout[key]["new"];
    }
    return orderedList;
}