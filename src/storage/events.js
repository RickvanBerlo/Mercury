
const events = [{ title: "test", startDate: "2020-04-01", endDate: "2020-04-02", time: true, startTime: "00:30", endTime: "04:00", description: "test" }];


export const getEvents = () => {
    return events;
}

export const setEvent = (eventProps) => {
    events.push(eventProps);
}