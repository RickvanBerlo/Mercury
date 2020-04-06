import { datediff, parseDateYMD } from '../utils/date';

const events = [];

export const getEvents = () => {
    return events;
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
        events[startDate.toLocaleDateString("fr-CA")].events.forEach((event, index) => {
            if (event.id === eventProps.id) {
                events[startDate.toLocaleDateString("fr-CA")].events.splice(index, 1);
                setEvent(eventProps, true);
                return;
            }
        })
    }

}

export const getEventsOfDay = (YMD) => {
    return events[YMD];
}