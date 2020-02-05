export const lerp = (begin, end, amount) => {
    return begin * (1 - amount) + end * amount;
};

export const invlerp = (begin, end, amount) => {
    return (amount - begin) / (end - begin)
}