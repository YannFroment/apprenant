import styled from 'styled-components';

import { useAppContext } from '../service-container/ServiceContainerContext';

const LoginContainer = styled.div``;

export const Login = () => {
  const { useAuth } = useAppContext();
  const { accessToken } = useAuth();
  return (
    <LoginContainer>
      <div>{accessToken}</div>
    </LoginContainer>
  );
};
