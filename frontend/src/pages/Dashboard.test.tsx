import { waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { Backend } from '../domain/Backend';
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('Should call backend', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
    };
    const consoleSpy = jest.spyOn(console, 'log');

    renderWithinProviders(<Dashboard />, { backend });
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
  it('Should call backend and render a message', async () => {
    const backend: Backend = {
      get: async () => {
        return 'hello world';
      },
    };
    const consoleSpy = jest.spyOn(console, 'log');

    renderWithinProviders(<Dashboard />, { backend });
    await waitFor(() => {
      const logMessage = consoleSpy.mock.calls[0][0];
      expect(logMessage).toEqual('hello world');
      consoleSpy.mockRestore();
    });
  });
});
