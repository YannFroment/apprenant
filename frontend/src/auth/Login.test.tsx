import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { inMemoryBackend, renderWithinProviders } from '../../tests/utils';
import { Login, SignIn } from './Login';

describe('Login', () => {
  it('should invite to sign in when not signed in', async () => {
    renderWithinProviders({
      children: <Login defaultAccessToken={undefined} />,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('sign-in')).toBeInTheDocument();
      expect(screen.queryByTestId('log-out')).not.toBeInTheDocument();
    });
  });

  it('should invite to log out when signed in', async () => {
    renderWithinProviders({
      children: <Login defaultAccessToken={'token'} />,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('log-out')).toBeInTheDocument();
      expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument();
    });
  });
});

describe('SignIn', () => {
  it('should call the auth endpoint on button click', async () => {
    const signIn = async () => {};
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
    // TODO
    /**
     * save access_token -> should be done within useAuth hook
     * persist refresh_token -> should be done within useAuth hook
     */
  });
});

describe('LogOut', () => {
  it('', () => {
    // TODO
    /**
     * simple button
     * call logout method of useAuth
     */
  });
});
