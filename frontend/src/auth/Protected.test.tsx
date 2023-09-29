import { screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { renderWithinProviders } from '../../tests/utils';
import { createUseAuthStore } from '../store/useAuthStore';
import { Protected } from './Protected';

describe('Protected', () => {
  it('should display element if user is logged in', () => {
    renderWithinProviders({
      children: (
        <Protected>
          <div data-testid="protected-component" />
        </Protected>
      ),
      overrideServices: {
        useAuthStore: createUseAuthStore({ isLoggedIn: true }),
      },
    });

    expect(screen.queryByTestId('protected-component')).toBeInTheDocument();
  });

  it('should redirect to login page if user is not logged in', async () => {
    const router = createMemoryRouter(
      [
        { path: '/login', element: <div data-testid="login" /> },
        {
          path: '/',
          element: (
            <Protected>
              <div></div>
            </Protected>
          ),
        },
      ],
      { initialEntries: ['/'], initialIndex: 1 },
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
});
