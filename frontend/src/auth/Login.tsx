import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from './useAuth';

const LoginContainer = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input``;

type SignInProps = {
  defaultEmail?: string;
  defaultPassword?: string;
};

export const SignIn = ({
  defaultEmail = 'john@doe.com',
  defaultPassword = 'password',
}: SignInProps) => {
  const [email, setEmail] = useState<string>(defaultEmail);
  const [password, setPassword] = useState<string>(defaultPassword);

  const { signIn } = useAuth();

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
      <button
        data-testid="signin"
        type="button"
        onClick={() => signIn({ email, password })}
      >
        Se connecter
      </button>
    </Form>
  );
};

export const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <button type="button" data-testid="log-out" onClick={logOut}>
      Se déconnecter
    </button>
  );
};

export const Login = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer data-testid="login">
      <SignIn />
    </LoginContainer>
  );
};
