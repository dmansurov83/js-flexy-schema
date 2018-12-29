export function isPrimitive(val) {
    return val !== Object(val);
}

export function clone(data) {
    if (isPrimitive(data)) return data;
    return {...data};
}