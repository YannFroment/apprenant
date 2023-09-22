import { Storage } from '../domain/Storage';

export const storage: Storage = {
  saveRefreshToken: async (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken);
  },
};
