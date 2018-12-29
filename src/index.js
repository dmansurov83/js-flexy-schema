import ConstraintSchema from "./schemas/ConstraintSchema";
import {NumberSchema, StringSchema} from "./schemas/PrimitiveSchemas";
import DefaultValueSchema from "./schemas/DefaultValueSchema";
import CombinedSchema from "./schemas/CombinedSchema";
import ArraySchema from "./schemas/ArraySchema";
import MapSchema from "./schemas/MapSchema";

export function notNull() {
    return new ConstraintSchema(data => data !== null && data !== undefined, 'Not null');
}

export function string(options) {
    return new StringSchema();
}

export function defaultValue(value) {
    return new DefaultValueSchema(value);
}

export function combine(...schemas) {
    return new CombinedSchema(schemas);
}

export function number(...preprocessSchemas) {
    if (preprocessSchemas.length) {
        return new CombinedSchema([
            ...preprocessSchemas,
            new NumberSchema(),
        ]);
    }
    return new NumberSchema();
}

export function array(elementSchema) {
    return new ArraySchema(elementSchema);
}

export function map(schema, options) {
    return new MapSchema(schema, options);
}
