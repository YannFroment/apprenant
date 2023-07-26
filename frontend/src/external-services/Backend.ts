import axios from 'axios';

import { Backend, TextReorder, WordRecognition } from '../domain/Backend';

export const backend: Backend = {
  getTextReorders: async (): Promise<TextReorder[]> => {
    const { data } = await axios.get('http://localhost:3000/text-reorders');
    return data as TextReorder[];
  },
  getWordRecognitions: async (): Promise<WordRecognition[]> => {
    const { data } = await axios.get('http://localhost:3000/word-recognition');
    return data as WordRecognition[];
  },
};
