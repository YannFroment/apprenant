import {
  cutTextIntoSentences,
  addMissingFinalPunctuation,
  checkSentencePosition,
} from './sentences';

describe('cutTextIntoSentences', () => {
  it('Should not cut 1 sentence', () => {
    const text = 'Bonjour.';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(expect.arrayContaining(['Bonjour.']));
  });
  it('Should cut 2 sentences', () => {
    const text = 'Bonjour. Il fait beau.';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(
      expect.arrayContaining(['Bonjour.', 'Il fait beau.']),
    );
  });
  it('Should cut 2 sentences', () => {
    const text = 'Bonjour. Il fait beau.';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(
      expect.arrayContaining(['Bonjour.', 'Il fait beau.']),
    );
  });
  it('Should cut 2 sentences with exclamation mark', () => {
    const text = 'Bonjour ! Il fait beau.';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(
      expect.arrayContaining(['Bonjour !', 'Il fait beau.']),
    );
  });
  it('Should cut 2 sentences with question mark', () => {
    const text = 'Bonjour ! Il fait beau ?';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(
      expect.arrayContaining(['Bonjour !', 'Il fait beau ?']),
    );
  });
  it("Should add a period when text doesn't finish with punctuation", () => {
    const text = 'Il fait beau';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(expect.arrayContaining(['Il fait beau.']));
  });
  it('Should cut a long text', () => {
    const text =
      'Dans les quartiers prioritaires de la politique de la ville, la part des livreurs dans l’emploi local est cinq fois plus élevée qu’ailleurs. Une situation particulièrement marquée dans les secteurs les plus pauvres de Lormont, Cenon, Floirac ou Bordeaux. Des hommes (à 90 %), jeunes (la moitié a moins de 25 ans), résidant dans des quartiers populaires où le taux de pauvreté est particulièrement élevé : le profil des livreurs à vélo qui se dessine dans l’étude d’Hugo Botton, du cabinet Compas, confirme « l’ubérisation des quartiers populaires » à laquelle n’échappent pas de larges pans de la Métropole bordelaise. Selon les chiffres de l’Institut national de la statistique et des études économiques (Insee), analysés par des journalistes de la presse régionale au sein du collectif Data + Local, plus de 400 livreurs ont créé leur autoentreprise dans le quartier Saint-Michel à Bordeaux depuis 2015. Ils sont près de 200 dans les quartiers Palmer et Dravemont de Cenon et Floirac, près d’une centaine dans les quartiers du Lac à Bordeaux, du Grand-Parc ou encore de Génicart à Lormont.';

    const result = cutTextIntoSentences(text);

    expect(result).toEqual(
      expect.arrayContaining([
        'Dans les quartiers prioritaires de la politique de la ville, la part des livreurs dans l’emploi local est cinq fois plus élevée qu’ailleurs.',
        'Une situation particulièrement marquée dans les secteurs les plus pauvres de Lormont, Cenon, Floirac ou Bordeaux.',
        'Des hommes (à 90 %), jeunes (la moitié a moins de 25 ans), résidant dans des quartiers populaires où le taux de pauvreté est particulièrement élevé : le profil des livreurs à vélo qui se dessine dans l’étude d’Hugo Botton, du cabinet Compas, confirme « l’ubérisation des quartiers populaires » à laquelle n’échappent pas de larges pans de la Métropole bordelaise.',
        'Selon les chiffres de l’Institut national de la statistique et des études économiques (Insee), analysés par des journalistes de la presse régionale au sein du collectif Data + Local, plus de 400 livreurs ont créé leur autoentreprise dans le quartier Saint-Michel à Bordeaux depuis 2015.',
        'Ils sont près de 200 dans les quartiers Palmer et Dravemont de Cenon et Floirac, près d’une centaine dans les quartiers du Lac à Bordeaux, du Grand-Parc ou encore de Génicart à Lormont.',
      ]),
    );
  });
});

describe('addMissingPunctuation', () => {
  it.each([
    { text: 'Bonjour.', expected: 'Bonjour.' },
    { text: 'Bonjour !', expected: 'Bonjour !' },
    { text: 'Bonjour ?', expected: 'Bonjour ?' },
  ])(
    'Should not add punctuation when text finishes with punctuation',
    ({ text, expected }) => {
      const result = addMissingFinalPunctuation(text);

      expect(result).toBe(expected);
    },
  );
  it('Should add punctuation when text does not finish with punctuation', () => {
    const text = 'Bonjour';

    const result = addMissingFinalPunctuation(text);

    expect(result).toBe('Bonjour.');
  });
});

describe('checkSentencePosition', () => {
  it('should be true when sentence is at the right position', () => {
    const sentences = ['Bonjour.', 'Il fait beau'];
    const result = checkSentencePosition(sentences, 0, 'Bonjour.');

    expect(result).toBe(true);
  });
  it('should be false when sentence is at the wrong position', () => {
    const sentences = ['Bonjour.', 'Il fait beau'];
    const result = checkSentencePosition(sentences, 1, 'Bonjour.');

    expect(result).toBe(false);
  });
  it('should be true if sentence matches even if sentence has multiple occurences', () => {
    const sentences = ['Bonjour.', 'Bonjour.'];
    const result = checkSentencePosition(sentences, 1, 'Bonjour.');

    expect(result).toBe(true);
  });
});
