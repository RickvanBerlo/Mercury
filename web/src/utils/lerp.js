export const lerp = (begin, end, amount) => {
    //amount = percentage
    return begin * (1 - amount) + end * amount;
};

export const invlerp = (begin, end, amount) => {
    //amount is value between begin and end.
    return (amount - begin) / (end - begin)
}