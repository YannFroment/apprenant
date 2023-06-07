import { cut } from './sentences';

describe('Sentences', () => {
  it('Should not cut 1 sentence', () => {
    const text = 'Bonjour.';

    const result = cut(text);

    expect(result).toEqual(expect.arrayContaining(['Bonjour.']));
  });
});
