import { Credentials } from '../domain/Backend';
import { useAppContext } from '../service-container/ServiceContainerContext';

export type UseAuth = (defaultAccessToken?: string | null) => {
  isLoggedIn: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  logOut: () => Promise<void>;
};

export const useAuth: UseAuth = () => {
  const { backend, useAuthStore } = useAppContext();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  const signIn = async (credentials: Credentials) => {
    await backend.signIn(credentials);
    setIsLoggedIn(true);
  };

  const logOut = async () => {
    await backend.logOut();
    setIsLoggedIn(false);
  };

  return { isLoggedIn, signIn, logOut };
};
