import { Inject, Injectable } from '@nestjs/common';

export const WordRecognitions = 'WordRecognitions';

type Word = {
  word: string;
  url: string;
};

export type WordRecognition = {
  id: number;
  title: string;
  words: Word[];
};

export interface WordRecognitions {
  getAll: () => Promise<WordRecognition[]>;
}

@Injectable()
export class WordRecognitionService {
  constructor(
    @Inject(WordRecognitions)
    private readonly wordRecognitions: WordRecognitions,
  ) {}

  async getAll(): Promise<WordRecognition[]> {
    return this.wordRecognitions.getAll();
  }
}
