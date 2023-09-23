import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

import { Backend, Credentials, Tokens } from '../domain/Backend';
import { TextReorder, Trainings, WordRecognition } from '../domain/Trainings';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let accessToken = '';
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      accessTokenHasExpired(
        error.response.status,
        error.response.data.message,
      ) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        accessToken = await refreshAccessToken(refreshToken);
      }

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);

const accessTokenHasExpired = (status: number, message: string): boolean =>
  status === 403 && message === 'Token expired';

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const { data: tokens } = await axios.get<Tokens, AxiosResponse<Tokens>>(
    `${BACKEND_URL}/auth/refresh`,
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );

  return tokens.access_token;
};

export const backend: Backend = {
  getTrainings: async (): Promise<Trainings> => {
    const [{ data: textReorders }, { data: wordRecognitions }] =
      await Promise.all([
        axiosInstance.get<TextReorder[]>(`${BACKEND_URL}/text-reorders`),
        axiosInstance.get<WordRecognition[]>(`${BACKEND_URL}/word-recognition`),
      ]);

    return {
      textReorders,
      wordRecognitions,
    };
  },
  signIn: async (credentials: Credentials): Promise<Tokens> => {
    const { data: tokens } = await axiosInstance.post<
      Tokens,
      AxiosResponse<Tokens>,
      Credentials
    >(`${BACKEND_URL}/auth/login`, credentials);
    accessToken = tokens.access_token;

    return tokens;
  },
  logOut: async () => {
    await axiosInstance.get(`${BACKEND_URL}/auth/logout`);
  },
};
