export const parseDateYMD = (str) => {
    let ymd = str.split('-');
    let date = new Date(ymd[0], ymd[1] - 1, ymd[2]);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
}

export const datediff = (startDate, endDate) => {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (parseDateYMD(endDate) - parseDateYMD(startDate)) / millisecondsPerDay;
}
