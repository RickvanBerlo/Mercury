export const ParseTimeToString = (hour, quarter) => {
    return `${hour < 10 ? "0" + hour : hour}:${quarter * 15 === 0 ? "00" : quarter * 15}`;
}

export const ChangeTimeByHour = (time, amount) => {
    const array = time.split(':');
    array[0] = parseInt(array[0]);
    array[1] = parseInt(array[1]);
    array[0] += amount;
    while (true) {
        if (array[0] > 23) {
            array[0] -= 24;
        } else if (array[0] < 0) {
            array[0] += 24;
        } else {
            break;
        }
    }
    return `${array[0] < 10 ? "0" + array[0] : array[0]}:${array[1] < 10 ? "0" + array[1] : array[1]}`;
}

export const ChangeTimeByMinute = (time, amount) => {
    const array = time.split(':');
    array[0] = parseInt(array[0]);
    array[1] = parseInt(array[1]);
    array[1] += amount;
    while(true){
        if(array[1] > 59) {
            array[1] -= 60;
            array[0] += 1;
        }else if (array[1] < 0){
            array[1] += 60;
            array[0] -= 1;
        }else{
            break;
        }
    }
    return `${array[0] < 10 ? "0" + array[0] : array[0]}:${array[1] < 10 ? "0" + array[1] : array[1]}`;
}