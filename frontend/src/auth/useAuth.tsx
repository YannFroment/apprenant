import { useState } from 'react';

export type UseAuth = () => {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const createUseAuth: (defaultAccessToken?: string | null) => UseAuth =
  (defaultAccessToken = null): UseAuth =>
  () => {
    const [accessToken, setAccessToken] = useState<string | null>(
      defaultAccessToken,
    );

    return { accessToken, setAccessToken };
  };
