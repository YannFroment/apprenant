import { screen, waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { Login } from './Login';
import { createUseAuth } from './useAuth';

describe('Login', () => {
  it('should invite to sign in when not signed in', async () => {
    renderWithinProviders({
      children: <Login />,
      overrideServices: { useAuth: createUseAuth(null) },
    });

    await waitFor(() => {
      expect(screen.queryByTestId('sign-in')).toBeInTheDocument();
      expect(screen.queryByTestId('log-out')).not.toBeInTheDocument();
    });
  });

  it('should invite to log out when signed in', async () => {
    renderWithinProviders({
      children: <Login />,
      overrideServices: { useAuth: createUseAuth('access_token') },
    });

    await waitFor(() => {
      expect(screen.queryByTestId('log-out')).toBeInTheDocument();
      expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument();
    });
  });
});

describe('Signin', () => {
  it('', () => {
    // TODO
    /**
     * form with email and password
     * api call when hit
     * save access_token
     * persist refresh_token
     */
  });
});

describe('LogOut', () => {
  it('', () => {
    // TODO
    /**
     * simple button
     * set accessToken to undefined
     * erase refresh_token
     */
  });
});
