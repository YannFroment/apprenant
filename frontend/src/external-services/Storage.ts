import { Storage } from '../domain/Storage';

const REFRESH_TOKEN_KEY = 'refresh_token';

export const storage: Storage = {
  saveRefreshToken: (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  deleteRefreshToken: () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
