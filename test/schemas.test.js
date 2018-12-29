import {string, map, number, defaultValue, combine, array} from '../src';

test('Test', () => {
    const baseQuestionSchema = map({
        id: defaultValue(Math.random),
    });

    const questionWithNameSchema = baseQuestionSchema.extend({
        name: string(),
    });

    const schema = map({
        id: defaultValue(Math.random),
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

    const parsed = schema.process(data);
    console.log(parsed);
    expect(parsed.title).toBe('bad title');
    expect(!!parsed.id).toBe(true);
    expect(parsed.questions.map(q => q.id).every(id => id > 0)).toBe(true);
});