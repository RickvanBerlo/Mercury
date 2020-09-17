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
            return { ...newState };
        case (actions.DELETE_EVENT + fulfilled):
            //newState = deleteEvent(state, state.passedEvent);
            return { ...newState };
        case (actions.GET_EVENT + fulfilled):
            return { ...state };
        case (actions.GET_EVENTS_OF_MONTH + fulfilled):
            newState = {...state}
            action.payload.forEach((event) => {
                newState = addEvent(newState, event);
            })
            return { ...state, events: {...newState.events }, layout: {...newState.layout} };
        case (actions.REPLACE_EVENT + fulfilled):
            //events = replaceEvent(state.events, action.payload, state.passedEvent);
            return { ...newState };
        case actions.PASS_EVENT:
            return { ...state, passedEvent: action.payload };
        default:
            return state;
    }
}

// const replaceEvent = (events, newEvent, oldEvent) => {
//     deleteEvent(events, oldEvent);
//     addEvent(events, newEvent);
//     return events;
// }

const addEvent = (state, event) => {
    event.startDate = `${event.startDate[0]}-${event.startDate[1] < 10 ? "0" + event.startDate[1] : event.startDate[1]}-${event.startDate[2] < 10 ? "0" + event.startDate[2] : event.startDate[2]}`;
    event.endDate = `${event.endDate[0]}-${event.endDate[1] < 10 ? "0" + event.endDate[1] : event.endDate[1]}-${event.endDate[2] < 10 ? "0" + event.endDate[2] : event.endDate[2]}`;
    event.endTime = `${event.endTime[0] < 10 ? "0" + event.endTime[0] : event.endTime[0]}:${event.endTime[1] < 10 ? "0" + event.endTime[1] : event.endTime[1]}`;
    event.startTime = `${event.startTime[0] < 10 ? "0" + event.startTime[0] : event.startTime[0]}:${event.startTime[1] < 10 ? "0" + event.startTime[1] : event.startTime[1]}`;
    //check if the object already exists in the events array. if it doesn't place it in the layout.
    if (state.events[event.id] === undefined){
        state.events[event.id] = event;
        placeEventInLayout(state, event);
    }
    state.events[event.id] = event;
    return state;
}

const placeEventInLayout = (state, event) => {
    const startDate = parseDateYMD(event.startDate);
    let difference = datediff(event.startDate, event.endDate);
    for (let i = 0; i <= difference; i++) {
        const key = startDate.toLocaleDateString("fr-CA");
        if (state.layout[key] === undefined) state.layout[key] = {};
        //when the new event date is smaller then the current date change event to undifined. this will sort the list without adding the new event.
        if(new Date(event.endDate).getTime() < startDate.getTime())
            state.layout[key] = orderList(state.events, state.layout, key);
        else
            state.layout[key] = orderList(state.events, state.layout, key, event);
        //change difference to last knows date in list;
        difference = datediff(event.startDate, getLastKnownDate(state.events ,state.layout[key]))
        //up date by one
        startDate.setDate(startDate.getDate() + 1);
    }
}

const getLastKnownDate = (events, list) => {
    let lastKnownDate = new Date("1-1-1970").toLocaleDateString("fr-CA");
    for (const index in list) {
        if (new Date(events[list[index]].endDate).getTime() > new Date(lastKnownDate).getTime())
            lastKnownDate = events[list[index]].endDate;
    }
    return lastKnownDate;
}

const orderList = (events, layout, key, event = undefined) => {
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
    
    console.log("lets add new event to list")
    console.log(event);
    console.log("sort list for day")
    console.log(key);
    console.log("before")
    console.log(layout[key]);
    for (const index in layout[key]){
        console.log("check for days that have already a slot")
        amountOfItems++;
        const eventOfIndex = events[layout[key][index]];
        //check if events startdate is prior then the key
        if (new Date(eventOfIndex.startDate).getTime() < new Date(key).getTime()) {
            console.log("found");
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
    console.log("after");
    console.log(layout[key]);
    console.log("here is the amount of items left");
    console.log(amountOfItems);
    for (let i = 0; i < amountOfItems; i++){
        console.log("calculate the new slot for this event");
        console.log("here are the left over items");
        console.log(subtractLayout);
        //orderedlist has max_safe_interger amount of slots.
        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
            //loop over orderedlist to find first empty slot.
            if (orderedList[i] === undefined) {
                let smallestIndex;
                //second loop over layout[today].
                for (const index in subtractLayout) {
                    //do not check if you are comparing yourself.
                    console.log("startin index is");
                    console.log(index);
                    if (index !== smallestIndex) {
                        const a = smallestIndex === undefined ? { startDate: key, endDate: key, startTime: "24:00" } : events[layout[key][smallestIndex]];
                        const b = events[layout[key][index]];
                        console.log("this is object a");
                        console.log(a);
                        //check for length of days. larger amount of days will be place first in array
                        if (datediff(a.startDate, a.endDate) < datediff(b.startDate, b.endDate)) {
                            console.log("this index is larger then previous!");
                            console.log(index);
                            smallestIndex = index;
                        }
                        else if (datediff(a.startDate, a.endDate) === datediff(b.startDate, b.endDate)) {
                            console.log("the length of the events are the same!")
                            console.log(a.startTime.localeCompare(b.startTime));
                            console.log(b.startTime);
                            //check time. the earliest time will be placed first in the array.
                            if (a.startTime.localeCompare(b.startTime) > 0) {
                                console.log("this index is earlier then previous!");
                                console.log(index);
                                smallestIndex = index;
                            }
                        }
                    }
                }
                console.log("smallest index is");
                console.log(smallestIndex);
                orderedList[i] = layout[key][smallestIndex];
                delete subtractLayout[smallestIndex];
                console.log("left over items!");
                console.log(subtractLayout);
                console.log("orderd items");
                console.log(orderedList);
                break;
            }
        }
    }
    if (objectIsEmpty(orderedList)) {
        console.log("sorted list is empty!");
        //if orderedList is empty place in first slot
        orderedList[0] = layout[key]["new"];
    }
    return orderedList;
}

// const deleteEvent = (events, event) => {
//     if (event.hasTime) {
//         deleteTimedEvent(events, event);
//     } else {
//         calculateAllDayEventPlaces(events, event, false);
//     }
//     return events;
// }

// const deleteTimedEvent = (events, event) => {
//     const filterdEvents = events[event.startDate].timedEvents.filter((storedEvent) => { return storedEvent.id !== event.id });
//     events[event.startDate].timedEvents = filterdEvents;
// }

// const placeEventInArray = (events, event) => {
//     if (event.hasTime) {
//         placeTimedEvent(events, event);
//     } else {
//         calculateAllDayEventPlaces(events, event, true);
//     }
// }

// const placeTimedEvent = (events, event) => {
//     if (events[event.startDate] === undefined) {
//         events[event.startDate] = { usedPlaces: {}, timedEvents: [event], allDayEvents: [] }
//     } else {
//         if (!arrayContainsEvent(event.id, events[event.startDate].timedEvents)) events[event.startDate].timedEvents.push(event);
//     }
// }

// const calculateAllDayEventPlaces = (events, event, addTrue_DeleteFalse) => {
//     const startDate = parseDateYMD(event.startDate);
//     const diffrence = datediff(event.startDate, event.endDate);

//     startDate.setDate(startDate.getDate() + 1);
//     for (let i = 0; i < diffrence; i++) {
//         if (events[startDate.toLocaleDateString("fr-CA")] === undefined) events[startDate.toLocaleDateString("fr-CA")] = { usedPlaces: {}, timedEvents: [], allDayEvents: [] };
//         if (startDate.getDay() === 0) {
//             if (addTrue_DeleteFalse) placeAllDayEvent(events, event, startDate.toLocaleDateString("fr-CA"));
//             else removeAllDayEvent(events, event, startDate.toLocaleDateString("fr-CA"));
//         } else {
//             let place = undefined;
//             for(let j = 0; i < Number.MAX_SAFE_INTEGER; j++){
//                 if(events[startDate.toLocaleDateString("fr-CA")].usedPlaces[j] === undefined){
//                     place = j;
//                     break;
//                 }
//             }
//             if (addTrue_DeleteFalse) {
//                 changeUsedPlaces(events, startDate.toLocaleDateString("fr-CA"), place);
//             } else {
//                 changeUsedPlaces(events, startDate.toLocaleDateString("fr-CA"), place);
//             }
//         }
//         startDate.setDate(startDate.getDate() + 1);
//     }

//     if (addTrue_DeleteFalse) placeAllDayEvent(events, event, event.startDate);
//     else removeAllDayEvent(events, event, event.startDate);
// }

// const removeAllDayEvent = (events, event, date) => {
//     const filterdEvents = events[date].allDayEvents.filter((storedEvent) => { return storedEvent.id !== event.id });
//     events[date].allDayEvents = filterdEvents;
// }

// const placeAllDayEvent = (events, event, date) => {
//     if (events[date] === undefined) {
//         events[date] = { offset: 0, timedEvents: [], allDayEvents: [event] }
//     } else {
//         if (!arrayContainsEvent(event.id, events[date].allDayEvents)) events[date].allDayEvents.push(event);
//     }
// }

// const arrayContainsEvent = (id, events) => {
//     const length = events.filter((item) => {
//         return item.id === id;
//     }).length;

//     if (length > 0) return true;
//     return false;
// }