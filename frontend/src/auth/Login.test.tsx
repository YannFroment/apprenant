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

  it('should not invite to sign in when signed in', async () => {
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
  });
});

describe('LogOut', () => {
  it('', () => {
    // TODO
  });
});
