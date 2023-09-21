import axios from 'axios';

import { Backend } from '../domain/Backend';
import { TextReorder, Trainings, WordRecognition } from '../domain/Trainings';

export const backend: Backend = {
  getTrainings: async (): Promise<Trainings> => {
    const [{ data: textReorders }, { data: wordRecognitions }] =
      await Promise.all([
        axios.get<TextReorder[]>('http://localhost:3000/text-reorders'),
        axios.get<WordRecognition[]>('http://localhost:3000/word-recognition'),
      ]);

    return {
      textReorders,
      wordRecognitions,
    };
  },
  signIn: async () => {
    throw new Error('not yet implemented');
  },
};
