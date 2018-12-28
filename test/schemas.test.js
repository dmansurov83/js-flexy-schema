import {test} from 'mocha';
import {expect} from 'chai';
import {string, map, number, defaultValue, notNull, combine, array} from '../src/schemas';


test('Test', () => {
    const baseQuestionSchema = map({
        id: defaultValue(Math.random),
    });

    const questionWithNameSchema = baseQuestionSchema.extend({
        name: string(),
    });


    const schema = map({
        id: combine(string(), number()),
        title: string(),
        questions: array(questionWithNameSchema),
    });

    const data = {
        id: '123123',
        title: ' bad title',
        questions: [
            {
                question: ' asd asdf asdfa',
            },
            {
                question: ' asd asdf zzzz',
            },
        ]
    };

    const parsed = schema.parse(data);
    console.log(parsed);
    expect(parsed.title).to.be.equal('bad title')
});