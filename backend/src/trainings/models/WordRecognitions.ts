import { WordRecognition } from './WordRecognition';

export const WordRecognitions = 'WordRecognitions';

export interface WordRecognitions {
  getAll: () => Promise<WordRecognition[]>;
}
