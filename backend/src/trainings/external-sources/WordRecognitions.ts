import { WordRecognition } from '../models/WordRecognition';
import { WordRecognitions } from '../models/WordRecognitions';

export class ConcreteWordRecognitions implements WordRecognitions {
  async getAll(): Promise<WordRecognition[]> {
    return [
      {
        id: 1,
        title: 'Les transports',
        words: [{ word: 'voiture', url: 'voiture.jpg' }],
      },
    ];
  }
}
