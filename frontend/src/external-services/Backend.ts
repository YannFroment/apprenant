import axios from 'axios';

import { Backend } from '../domain/Backend';

export const backend: Backend = {
  get: async (url) => {
    const { data } = await axios.get(url);
    return data;
  },
};
