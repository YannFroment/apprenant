import { Credentials } from '../domain/Backend';
import { useAppContext } from '../service-container/ServiceContainerContext';

export type UseAuth = (defaultAccessToken?: string | null) => {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  signIn: (credentials: Credentials) => Promise<void>;
  logOut: () => Promise<void>;
};

export const useAuth: UseAuth = () => {
  const { backend, useAuthStore, storage } = useAppContext();
  const { accessToken, setAccessToken } = useAuthStore();

  const signIn = async (credentials: Credentials) => {
    const { access_token, refresh_token } = await backend.signIn(credentials);
    setAccessToken(access_token);
    storage.saveRefreshToken(refresh_token);
  };

  const logOut = async () => {
    setAccessToken(null);
    storage.deleteRefreshToken();
    await backend.logOut(accessToken as string); // TODO change this
  };

  const isLoggedIn = !!accessToken;

  return { accessToken, isLoggedIn, setAccessToken, signIn, logOut };
};
