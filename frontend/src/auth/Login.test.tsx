import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { inMemoryBackend, renderWithinProviders } from '../../tests/utils';
import { createUseAuthStore } from '../store/useAuthStore';
import { Login, SignIn } from './Login';

describe('Login', () => {
  it('should invite to sign in when not signed in', async () => {
    renderWithinProviders({
      children: <Login />,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('sign-in')).toBeInTheDocument();
      expect(screen.queryByTestId('log-out')).not.toBeInTheDocument();
    });
  });

  it('should invite to log out when signed in', async () => {
    renderWithinProviders({
      children: <Login />,
      overrideServices: {
        useAuthStore: createUseAuthStore({ accessToken: 'token' }),
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId('log-out')).toBeInTheDocument();
      expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument();
    });
  });
});

describe('SignIn', () => {
  it('should call the auth endpoint on button click', async () => {
    const signIn = async () => ({
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    });
    const backend = { ...inMemoryBackend, signIn };
    const spyOnSignIn = jest.spyOn(backend, 'signIn');

    renderWithinProviders({
      children: (
        <SignIn defaultEmail={'my@email.com'} defaultPassword={'pass'} />
      ),
      overrideServices: { backend },
    });

    await userEvent.click(screen.getByTestId('signin'));

    expect(spyOnSignIn).toHaveBeenCalledWith({
      email: 'my@email.com',
      password: 'pass',
    });
  });
});

describe('LogOut', () => {
  it('should make log out button disappear and sign in form reappear on log out click', async () => {
    renderWithinProviders({
      children: <Login />,
      overrideServices: {
        useAuthStore: createUseAuthStore({ accessToken: 'access_token' }),
      },
    });

    await userEvent.click(screen.getByTestId('log-out'));

    expect(screen.queryByTestId('log-out')).not.toBeInTheDocument();
  });
});
