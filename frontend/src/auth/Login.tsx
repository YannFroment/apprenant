import styled from 'styled-components';

import { useAppContext } from '../service-container/ServiceContainerContext';

const LoginContainer = styled.div``;

export const Login = () => {
  const { useAuth } = useAppContext();
  const { accessToken } = useAuth();

  const isLoggedIn = accessToken !== null;

  return (
    <LoginContainer>
      {isLoggedIn ? (
        <div data-testid="log-out">Se déconnecter</div>
      ) : (
        <div data-testid="sign-in">Se connecter</div>
      )}
    </LoginContainer>
  );
};
