import { useState } from 'react';
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
  defaultEmail = '',
  defaultPassword = '',
}: SignInProps) => {
  const [email, setEmail] = useState<string>(defaultEmail);
  const [password, setPassword] = useState<string>(defaultPassword);

  const { signIn, accessToken } = useAuth();
  console.info('accessToken in SignIn componen', accessToken);
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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { accessToken, signIn } = useAuth(defaultAccessToken);

  return (
    <LoginContainer>
      {accessToken ? (
        <LogOut />
      ) : (
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
      )}
    </LoginContainer>
  );
};
