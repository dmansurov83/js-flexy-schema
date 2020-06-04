import ConstraintSchema from "./schemas/ConstraintSchema";
import {NumberSchema, StringSchema, BooleanSchema} from "./schemas/PrimitiveSchemas";
import DefaultValueSchema from "./schemas/DefaultValueSchema";
import CombinedSchema from "./schemas/CombinedSchema";
import ArraySchema from "./schemas/ArraySchema";
import MapSchema from "./schemas/MapSchema";
import PredicateSchema from './schemas/PredicateSchema';

export function predicateSchema(predicate) {
    return new PredicateSchema(predicate);
}

export function notNull() {
    return new ConstraintSchema(data => data !== null && data !== undefined, 'Not null');
}

export function combine(...schemas) {
    if (!schemas.length) {
        throw new Error("No schemas")
    }
    if (schemas.length == 1) return schemas[0];
    return new CombinedSchema(schemas);
}

export function string(...preprocessSchemas) {
    return combine(...preprocessSchemas, new StringSchema());
}

export function number(...preprocessSchemas) {
    return combine(...preprocessSchemas, new NumberSchema());
}

export function boolean(...preprocessSchemas){
    return combine(...preprocessSchemas, new BooleanSchema());
}

export function defaultValue(value) {
    return new DefaultValueSchema(value);
}


export function array(elementSchema) {
    return new ArraySchema(elementSchema);
}

export function map(schema, options) {
    return new MapSchema(schema, options);
}
