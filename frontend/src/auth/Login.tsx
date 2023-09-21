import { useState } from 'react';
import styled from 'styled-components';

import { useAuth } from './useAuth';

const LoginContainer = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input``;

export const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <Form data-testid="sign-in">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button">Se connecter</button>
    </Form>
  );
};

export const LogOut = () => {
  return (
    <button type="button" data-testid="log-out">
      Se déconnecter
    </button>
  );
};

type LoginProps = {
  defaultAccessToken?: string;
};

export const Login = ({ defaultAccessToken }: LoginProps) => {
  const { isLoggedIn } = useAuth(defaultAccessToken);

  return (
    <LoginContainer>{isLoggedIn ? <LogOut /> : <SignIn />}</LoginContainer>
  );
};
