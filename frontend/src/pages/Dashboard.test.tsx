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
    const backendGetSpy = jest.spyOn(backend, 'get');

    renderWithinProviders(<Dashboard />, { backend });

    await waitFor(() => {
      expect(backendGetSpy).toHaveBeenCalled();
    });
  });
});
