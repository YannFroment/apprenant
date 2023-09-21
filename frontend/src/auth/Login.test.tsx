import { screen, waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { Login } from './Login';

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

describe('useSignIn', () => {
  it('should call the auth endpoint on button click', () => {
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
