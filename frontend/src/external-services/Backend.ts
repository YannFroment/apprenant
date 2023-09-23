import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

import { Backend, Credentials, Tokens } from '../domain/Backend';
import { TextReorder, Trainings, WordRecognition } from '../domain/Trainings';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const REFRESH_TOKEN_KEY = 'refresh_token';

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
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
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
    const {
      data: { access_token, refresh_token },
    } = await axiosInstance.post<Tokens, AxiosResponse<Tokens>, Credentials>(
      `${BACKEND_URL}/auth/login`,
      credentials,
    );
    accessToken = access_token;
    localStorage.setItem('refresh_token', refresh_token);

    return { access_token, refresh_token };
  },
  logOut: async () => {
    await axiosInstance.get(`${BACKEND_URL}/auth/logout`);
    localStorage.removeItem('refresh_token');
  },
};
