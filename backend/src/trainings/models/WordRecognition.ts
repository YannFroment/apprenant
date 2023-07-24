export class Word {
  id: number;
  word: string;
  url: string;
  wordRecognition: WordRecognition;
}

export class WordRecognition {
  id: number;
  title: string;
  words: Word[];
}
