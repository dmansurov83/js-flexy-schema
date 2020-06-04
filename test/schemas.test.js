import {string, map, number, defaultValue, predicateSchema, array, boolean} from '../src';
test('Test', () => {
    const baseQuestionSchema = map({
        id: number(defaultValue(Math.random)),
    });

    const questionWithNameSchema = baseQuestionSchema.extend({
        name: string(),
    });

    const schema = map({
        id: number(defaultValue(Math.random)),
        price: number(predicateSchema(Math.round)),
        title: string(),
        active: boolean(),
        questions: array(questionWithNameSchema),
    }, {parseMode:true});

    const data = {
        id: '123123',
        title: ' bad title',
        price: '123.43212',
        active: 1,
        anotherField: 'asd',
        questions: [
            {
                question: ' asd asdf asdfa',
            },
            {
                question: ' asd asdf zzzz',
            },
        ]
    };

    const parsed = schema.process(data);
    console.log(parsed);
    expect(parsed.title).toBe('bad title');
    expect(parsed.active).toBe(true);
    expect(parsed.price).toBe(123);
    expect(typeof parsed.id).toBe('number');
    expect(parsed.anotherField).toBeUndefined();
    expect(!!parsed.id).toBe(true);
    expect(parsed.questions.map(q => q.id).every(id => id > 0)).toBe(true);
});