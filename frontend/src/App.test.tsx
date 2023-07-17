import { waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../tests/utils';
import App from './App';
import { Backend } from './domain/Backend';

describe('Dashboard', () => {
  it('Should call backend', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
      getTextReorders: async () => {
        return [];
      },
    };
    const backendGetSpy = jest.spyOn(backend, 'getTextReorders');

    renderWithinProviders(<App />, { backend });

    await waitFor(() => {
      expect(backendGetSpy).toHaveBeenCalled();
    });
  });
});