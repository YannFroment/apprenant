import styled from 'styled-components';

import { useAppContext } from '../service-container/ServiceContainerContext';

const LoginContainer = styled.div``;

export const SignIn = () => {
  return (
    <button type="button" data-testid="sign-in">
      Se connecter
    </button>
  );
};

export const LogOut = () => {
  return (
    <button type="button" data-testid="log-out">
      Se déconnecter
    </button>
  );
};

export const Login = () => {
  const { useAuth } = useAppContext();
  const { accessToken } = useAuth();

  const isLoggedIn = accessToken !== null;

  return (
    <LoginContainer>{isLoggedIn ? <LogOut /> : <SignIn />}</LoginContainer>
  );
};
