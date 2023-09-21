import { useState } from 'react';

import { Credentials } from '../domain/Backend';
import { useAppContext } from '../service-container/ServiceContainerContext';

export type UseAuth = (defaultAccessToken?: string | null) => {
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  signIn: (credentials: Credentials) => Promise<void>;
};

export const useAuth: UseAuth = (defaultAccessToken: string | null = null) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    defaultAccessToken,
  );
  const { backend } = useAppContext();
  const { signIn } = backend;
  const isLoggedIn = accessToken !== null;

  return { isLoggedIn, setAccessToken, signIn };
};
