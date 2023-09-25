import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { inMemoryBackend, renderWithinProviders } from '../../tests/utils';
import { createUseAuthStore } from '../store/useAuthStore';
import { Login, LogOut, SignIn } from './Login';

describe('Login', () => {
  it('should invite to sign in when not logged in', async () => {
    const router = createMemoryRouter(
      [{ path: '/login', element: <Login /> }],
      { initialEntries: ['/login'], initialIndex: 1 },
    );
    renderWithinProviders({
      children: <RouterProvider router={router} />,
      overrideServices: {
        useAuthStore: createUseAuthStore({ isLoggedIn: false }),
      },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('login')).toBeInTheDocument();
    });
  });

  it('should redirect to route "/" when logged in', async () => {
    const router = createMemoryRouter(
      [
        { path: '/login', element: <Login /> },
        { path: '/', element: <></> },
      ],
      { initialEntries: ['/login'], initialIndex: 1 },
    );
    renderWithinProviders({
      children: <RouterProvider router={router} />,
      overrideServices: {
        useAuthStore: createUseAuthStore({ isLoggedIn: true }),
      },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/');
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
  });
});

describe('LogOut', () => {
  it('should display log out button when logged in', async () => {
    renderWithinProviders({
      children: <LogOut />,
      overrideServices: {
        useAuthStore: createUseAuthStore({ isLoggedIn: true }),
      },
    });

    expect(screen.queryByTestId('log-out')).toBeInTheDocument();
  });

  it('should call backend logout method when clicking on logout button', async () => {
    const spyOnLogOut = jest.spyOn(inMemoryBackend, 'logOut');
    renderWithinProviders({
      children: <LogOut />,
      overrideServices: {
        useAuthStore: createUseAuthStore({ isLoggedIn: true }),
        backend: inMemoryBackend,
      },
    });

    await userEvent.click(screen.getByTestId('log-out'));

    expect(spyOnLogOut).toHaveBeenCalled();
  });
});
