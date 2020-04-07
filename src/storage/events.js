import { datediff, parseDateYMD } from '../utils/date';

const events = [];
events["2020-04-06"] = { offset: 0, allDayEvents: [{ id: "a8fa1801-aa7d-4317-01dc-2799832af685", title: "test2", startDate: "2020-04-06", endDate: "2020-04-07", time: false, startTime: "00:00", endTime: "00:00", description: "test hahahahh    hahahahahah" }], timedEvents: [{ id: "a8fa1801-aa7d-4317-01dc-2799832af685", title: "test", startDate: "2020-04-06", endDate: "2020-04-06", time: true, startTime: "00:00", endTime: "00:15", description: "test hahahahh    hahahahahah" }] }

export const getEvents = () => {
    return events;
}

export const removeEvent = (eventProps) => {
    const startDate = parseDateYMD(eventProps.startDate);
    if (eventProps.time) {
        events[startDate.toLocaleDateString("fr-CA")].timedEvents.forEach((event, index) => {
            if (event.id === eventProps.id) {
                events[startDate.toLocaleDateString("fr-CA")].timedEvents.splice(index, 1);
                return;
            }
        })
    } else {
        events[startDate.toLocaleDateString("fr-CA")].allDayEvents.forEach((event, index) => {
            if (event.id === eventProps.id) {
                events[startDate.toLocaleDateString("fr-CA")].allDayEvents.splice(index, 1);
                return;
            }
        })
    }
}

export const setEvent = (eventProps, isnew) => {
    const startDate = parseDateYMD(eventProps.startDate);
    const diffrence = datediff(eventProps.startDate, eventProps.endDate);

    if (isnew) {
        for (let i = 0; i <= diffrence; i++) {
            const firstDayOfWeek = startDate.getDay() === 0;

            if (events[startDate.toLocaleDateString("fr-CA")] === undefined) {
                if (i === 0) events[startDate.toLocaleDateString("fr-CA")] = { offset: 0, allDayEvents: eventProps.time ? [] : [eventProps], timedEvents: eventProps.time ? [eventProps] : [] }
                else if (firstDayOfWeek) events[startDate.toLocaleDateString("fr-CA")] = { offset: 0, allDayEvents: eventProps.time ? [] : [eventProps], timedEvents: eventProps.time ? [eventProps] : [] }
                else events[startDate.toLocaleDateString("fr-CA")] = { offset: 1, allDayEvents: [], timedEvents: [] }
            } else {
                if (i === 0) eventProps.time ? events[startDate.toLocaleDateString("fr-CA")].timedEvents.push(eventProps) : events[startDate.toLocaleDateString("fr-CA")].allDayEvents.push(eventProps);
                else if (firstDayOfWeek) eventProps.time ? events[startDate.toLocaleDateString("fr-CA")].timedEvents.push(eventProps) : events[startDate.toLocaleDateString("fr-CA")].allDayEvents.push(eventProps);
                else events[startDate.toLocaleDateString("fr-CA")].offset += 1;
            }

            startDate.setDate(startDate.getDate() + 1);
        }
    } else {
        removeEvent(eventProps);
        setEvent(eventProps, true);
    }

}

export const getEventsOfDay = (YMD) => {
    return events[YMD];
}