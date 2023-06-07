import { cutTextIntoSentences } from './sentences';

describe('Sentences', () => {
  it('Should not cut 1 sentence', () => {
    const text = 'Bonjour.';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(expect.arrayContaining(['Bonjour.']));
  });
});
