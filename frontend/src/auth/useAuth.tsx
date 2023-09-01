import { useState } from 'react';

export type UseAuth = () => {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const useAuth: UseAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return { accessToken, setAccessToken };
};
