type Word = {
  word: string;
  url: string;
};

export type WordRecognition = {
  id: number;
  title: string;
  words: Word[];
};
