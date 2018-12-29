import Schema from "./Schema";


//seems this approach not works for validation
export default class ConstraintSchema extends Schema {
    constructor(checker, message) {
        super();
        this.cheker = checker;
        this.message = message;
    }

    process(data) {
        if (!this.cheker(data)) {
            throw new Error('ConstraintSchemaError: ' + this.message);
        }
    }
}