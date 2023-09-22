export type Storage = {
  saveRefreshToken: (token: string) => Promise<void>;
};
