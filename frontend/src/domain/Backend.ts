export type TextReorder = {
  id: number;
  title: string;
  orderedSentences: string[];
  randomizedSentences: string[];
};

type Word = {
  id: number;
  word: string;
  url: string;
};

export type WordRecognition = {
  id: number;
  title: string;
  words: Word[];
};

export type Backend = {
  get: (url: string) => Promise<string>;
  getTextReorders: () => Promise<TextReorder[]>;
  getWordRecognitions: () => Promise<WordRecognition[]>;
};
