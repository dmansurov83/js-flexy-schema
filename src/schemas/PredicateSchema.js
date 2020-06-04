export default class PredicateSchema {
    
    constructor(predicate) {
        this._predicate = predicate;
    }

    process(data) {
       return this._predicate(data); 
    }
}