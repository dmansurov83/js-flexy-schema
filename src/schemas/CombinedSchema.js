import Schema from "./Schema";
import {clone} from "../utils";

export default class CombinedSchema extends Schema {
    constructor(schemas) {
        super();
        this.schemas = schemas;
    }

    process(data) {
        return this.schemas.reduce((processed, schema) => schema.process(processed), clone(data));
    }
}