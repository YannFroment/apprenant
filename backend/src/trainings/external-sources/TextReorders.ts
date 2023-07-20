import { TextReorder } from '../models/TextReorder';

export class ConcreteTextReorders {
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
