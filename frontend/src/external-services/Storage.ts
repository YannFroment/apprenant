import { Storage } from '../domain/Storage';

export const storage: Storage = {
  saveRefreshToken: (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken);
  },
};
