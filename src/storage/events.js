import { datediff, parseDateYMD } from '../utils/date';

const events = [{ title: "test", startDate: "2020-04-05", endDate: "2020-04-12", time: true, startTime: "00:30", endTime: "04:00", description: "test" },
{ title: "test2", startDate: "2020-04-06", endDate: "2020-04-07", time: true, startTime: "00:30", endTime: "04:00", description: "test" }];

export const getEvents = () => {
    return events;
}

export const setEvent = (eventProps) => {
    events.push(eventProps);
}


export const getEventsOfDay = (YMD) => {
    let offset = 0;
    const tmpEvents = [];
    const firstDayOfWeek = parseDateYMD(YMD).getDay() === 0;

    events.forEach((event) => {
        if (event.startDate === YMD) {
            tmpEvents.push(event);
        } else {
            if (datediff(event.startDate, event.endDate) >= datediff(event.startDate, YMD) && parseDateYMD(YMD) > parseDateYMD(event.startDate)) {
                if (firstDayOfWeek) tmpEvents.push(event);
                else offset += 1;
            }
        }

    })
    return { offset: offset, events: tmpEvents };
}