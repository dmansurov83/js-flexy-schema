import Schema from "./Schema";
import {clone} from "../utils";

export default class MapSchema extends Schema {
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

    process(data) {
        const parsed = this.parseMode ? {} : clone(data);
        Object.keys(this.map).forEach((key) => {
            if (this.map[key]) {
                parsed[key] = this.map[key].process(data[key]);
            }
        });
        return parsed;
    }
}