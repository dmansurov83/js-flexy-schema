import Schema from "./Schema";

export default class ArraySchema extends Schema {
    constructor(elementSchema) {
        super();
        this.elementSchema = elementSchema;
    }

    process(data) {
        if (Array.isArray(data)) {
            return data.map(elem => this.elementSchema.process(elem));
        }
        return [];
    }
}