import { Credentials } from '../domain/Backend';
import { useAppContext } from '../service-container/ServiceContainerContext';

export type UseAuth = (defaultAccessToken?: string | null) => {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  signIn: (credentials: Credentials) => Promise<void>;
  logOut: () => void;
};

export const useAuth: UseAuth = () => {
  const { backend, useAuthStore, storage } = useAppContext();
  const { accessToken, setAccessToken } = useAuthStore();

  const signIn = async (credentials: Credentials) => {
    const { access_token, refresh_token } = await backend.signIn(credentials);
    setAccessToken(access_token);
    await storage.saveRefreshToken(refresh_token);
  };

  const logOut = () => {
    setAccessToken(null);
  };

  const isLoggedIn = !!accessToken;

  return { accessToken, isLoggedIn, setAccessToken, signIn, logOut };
};
