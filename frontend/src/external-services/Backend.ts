import axios from 'axios';

import {
  Backend,
  TextReorder,
  Trainings,
  WordRecognition,
} from '../domain/Backend';

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
};
