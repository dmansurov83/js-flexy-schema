import Schema from "./Schema";

export class StringSchema extends Schema {
    process(data) {
        if (!data) return '';
        return `${data}`.trim();
    }
}

export class NumberSchema extends Schema {
    process(data) {
        return Number(data);
    }
}