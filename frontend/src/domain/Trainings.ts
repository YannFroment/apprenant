export type TextReorder = {
  id: number;
  title: string;
  orderedSentences: string[];
  randomizedSentences: string[];
};

export type Word = {
  id: number;
  label: string;
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
