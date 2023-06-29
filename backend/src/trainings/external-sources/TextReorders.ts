import { TextReorder } from '../models/TextReorder';
import { TextReorders } from '../models/TextReorders';

export class ConcreteTextReorders implements TextReorders {
  async getAll(): Promise<TextReorder[]> {
    return [
      {
        id: 1,
        title: 'Véritable article sud-ouest',
        orderedSentences: ['phrase 1', 'phrase 2'],
        randomizedSentences: ['phrase 2', 'phrase 1'],
      },
    ];
  }
}
