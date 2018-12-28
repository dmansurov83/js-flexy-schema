function isPrimitive(val) {
    return val !== Object(val);
}
class Schema {
    parse(data) {
        return data;
    }
}

function clone(data) {
    if (isPrimitive(data)) return data;
    return {...data};
}

class MapSchema extends Schema {
    constructor(map, {parseMode = false} = {}) {
        super();
        this.map = map;
        this.parseMode = parseMode;
    }

    extend(map) {
        return new MapSchema({
            ...this.map,
            ...map,
        }, this.parseMode);
    }

    parse(data) {
        const parsed = this.parseMode ? {} : clone(data);
        Object.keys(this.map).forEach((key) => {
            if (this.map[key]) {
                parsed[key] = this.map[key].parse(data[key]);
            }
        });
        return parsed;
    }
}

class ArraySchema extends Schema {
    constructor(elementSchema) {
        super();
        this.elementSchema = elementSchema;
    }

    parse(data) {
        if (Array.isArray(data)) {
            return data.map(elem => this.elementSchema.parse(elem));
        }
        return [];
    }
}

class StringSchema extends Schema {
    parse(data) {
        if (!data) return '';
        return `${data}`.trim();
    }
}

class NumberSchema extends Schema {
    parse(data) {
        return Number(data);
    }
}

class ConstraintSchema extends Schema {
    constructor(checker, message) {
        super();
        this.cheker = checker;
        this.message = message;
    }

    parse(data) {
        if (!this.cheker(data)) {
            throw new Error('ConstraintSchemaError: ' + this.message);
        }
    }
}

class CombinedSchema extends Schema {
    constructor(schemas) {
        super();
        this.schemas = schemas;
    }

    parse(data) {
        return this.schemas.reduce((parsed, schema) => schema.parse(parsed), clone(data));
    }
}

class DefaultValueSchema extends Schema {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    parse(data) {
        if (data === null || data === undefined) {
            if (typeof this.defaultValue === 'function') {
                return this.defaultValue();
            }
            return this.defaultValue;
        }
        return data;
    }
}


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
