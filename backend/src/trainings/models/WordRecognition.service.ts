import { Inject, Injectable } from '@nestjs/common';
import { WordRecognition } from './WordRecognition';
import { WordRecognitions } from './WordRecognitions';

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
