import axios, { AxiosResponse } from 'axios';

import { Backend, Credentials, Tokens } from '../domain/Backend';
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
  signIn: async (credentials: Credentials): Promise<Tokens> => {
    const { data: tokens } = await axios.post<
      Tokens,
      AxiosResponse<Tokens>,
      Credentials
    >('http://localhost:3000/auth/login', credentials);

    return tokens;
  },
};
