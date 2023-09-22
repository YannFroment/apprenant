import axios, { AxiosResponse } from 'axios';

import { Backend, Credentials, Tokens } from '../domain/Backend';
import { TextReorder, Trainings, WordRecognition } from '../domain/Trainings';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const backend: Backend = {
  getTrainings: async (): Promise<Trainings> => {
    const [{ data: textReorders }, { data: wordRecognitions }] =
      await Promise.all([
        axios.get<TextReorder[]>(`${BACKEND_URL}/text-reorders`),
        axios.get<WordRecognition[]>(`${BACKEND_URL}/word-recognition`),
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
    >(`${BACKEND_URL}/auth/login`, credentials);

    return tokens;
  },

  logOut: async (accessToken: string) => {
    await axios.get(`${BACKEND_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
