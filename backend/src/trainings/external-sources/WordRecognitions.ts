import { WordRecognition } from '../models/WordRecognition';
import { WordRecognitions } from '../models/WordRecognitions';

export class ConcreteWordRecognitions implements WordRecognitions {
  async getAll(): Promise<WordRecognition[]> {
    const wordRecognition: WordRecognition = {
      id: 1,
      title: 'Les transports',
      words: [{ id: 1, word: 'voiture', url: 'voiture.jpg' }],
    };
    return [wordRecognition];
  }
}
