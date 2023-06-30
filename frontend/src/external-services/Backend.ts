import axios from 'axios';

import { Backend, TextReorder } from '../domain/Backend';

export const backend: Backend = {
  get: async (url) => {
    const { data } = await axios.get(url);
    return data;
  },
  getTextReorders: async (): Promise<TextReorder[]> => {
    const { data } = await axios.get('http://localhost:3000/text-reorders');
    return data as TextReorder[];
  },
};
