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
  const { backend, useAuthStore } = useAppContext();
  const { accessToken, setAccessToken } = useAuthStore();

  const signIn = async (credentials: Credentials) => {
    const { access_token } = await backend.signIn(credentials);
    setAccessToken(access_token);
  };

  const logOut = async () => {
    await backend.logOut();
    setAccessToken(null);
  };

  const isLoggedIn = !!accessToken;

  return { accessToken, isLoggedIn, setAccessToken, signIn, logOut };
};
