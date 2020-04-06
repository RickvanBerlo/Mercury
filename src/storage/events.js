import { datediff, parseDateYMD } from '../utils/date';

const events = [];
events["2020-04-06"] = { offset: 0, events: [{ id: "a8fa1801-aa7d-4317-01dc-2799832af685", title: "test", startDate: "2020-04-06", endDate: "2020-04-06", time: true, startTime: "00:00", endTime: "00:00", description: "test hahahahh    hahahahahah" }] }

export const getEvents = () => {
    return events;
}

export const removeEvent = (eventProps) => {
    const startDate = parseDateYMD(eventProps.startDate);
    events[startDate.toLocaleDateString("fr-CA")].events.forEach((event, index) => {
        if (event.id === eventProps.id) {
            events[startDate.toLocaleDateString("fr-CA")].events.splice(index, 1);
            return;
        }
    })
}

export const setEvent = (eventProps, isnew) => {
    const startDate = parseDateYMD(eventProps.startDate);
    const diffrence = datediff(eventProps.startDate, eventProps.endDate);

    if (isnew) {
        for (let i = 0; i <= diffrence; i++) {
            const firstDayOfWeek = startDate.getDay() === 0;

            if (events[startDate.toLocaleDateString("fr-CA")] === undefined) {
                if (i === 0) events[startDate.toLocaleDateString("fr-CA")] = { offset: 0, events: [eventProps] }
                else if (firstDayOfWeek) events[startDate.toLocaleDateString("fr-CA")] = { offset: 0, events: [eventProps] }
                else events[startDate.toLocaleDateString("fr-CA")] = { offset: 1, events: [] }
            } else {
                if (i === 0) events[startDate.toLocaleDateString("fr-CA")].events.push(eventProps);
                else if (firstDayOfWeek) events[startDate.toLocaleDateString("fr-CA")].events.push(eventProps);
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