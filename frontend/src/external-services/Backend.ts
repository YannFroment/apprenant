import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

import { Backend, Credentials } from '../domain/Backend';
import { TextReorder, Trainings, WordRecognition } from '../domain/Trainings';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const REFRESH_TOKEN_KEY = 'refresh_token';
type Tokens = { access_token: string; refresh_token: string };

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
      await regenerateTokens();

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  },
);

const accessTokenHasExpired = (status: number, message: string): boolean =>
  status === 403 && message === 'Token expired';

const regenerateTokens = async (): Promise<void> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  const { data: tokens } = await axios.get<Tokens, AxiosResponse<Tokens>>(
    `${BACKEND_URL}/auth/refresh`,
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    },
  );

  accessToken = tokens.access_token;
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
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
  signIn: async (credentials: Credentials): Promise<void> => {
    const {
      data: { access_token, refresh_token },
    } = await axiosInstance.post<Tokens, AxiosResponse<Tokens>, Credentials>(
      `${BACKEND_URL}/auth/login`,
      credentials,
    );
    accessToken = access_token;
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  },
  logOut: async () => {
    await axiosInstance.get(`${BACKEND_URL}/auth/logout`);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  autoLogIn: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      return false;
    }

    await regenerateTokens();

    return true;
  },
};
