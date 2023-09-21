import { useState } from 'react';

import { Credentials } from '../domain/Backend';
import { useAppContext } from '../service-container/ServiceContainerContext';

export type UseAuth = () => {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  signIn: (credentials: Credentials) => Promise<void>;
};

export const createUseAuth =
  (defaultAccessToken: string | null = null): UseAuth =>
  () => {
    const [accessToken, setAccessToken] = useState<string | null>(
      defaultAccessToken,
    );
    const { backend } = useAppContext();
    const { signIn } = backend;

    return { accessToken, setAccessToken, signIn };
  };
