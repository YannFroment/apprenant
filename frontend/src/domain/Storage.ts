export type Storage = {
  saveRefreshToken: (token: string) => void;
  deleteRefreshToken: () => void;
};
