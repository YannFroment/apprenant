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

export type Trainings = {
  textReorders: TextReorder[];
  wordRecognitions: WordRecognition[];
};

export type Backend = {
  getTextReorders: () => Promise<TextReorder[]>;
  getWordRecognitions: () => Promise<WordRecognition[]>;
  getTrainings: () => Promise<Trainings>;
};
