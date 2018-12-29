import Schema from "./Schema";

export default class DefaultValueSchema extends Schema {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    process(data) {
        if (data === null || data === undefined) {
            if (typeof this.defaultValue === 'function') {
                return this.defaultValue();
            }
            return this.defaultValue;
        }
        return data;
    }
}