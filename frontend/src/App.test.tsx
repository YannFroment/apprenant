import { waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../tests/utils';
import App from './App';
import { Backend } from './domain/Backend';

describe('Dashboard', () => {
  it('should retrieve text reorders from backend', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
      getTextReorders: async () => {
        return [];
      },
      getWordRecognitions: async () => {
        return [];
      },
    };
    const getTextReordersSpy = jest.spyOn(backend, 'getTextReorders');

    renderWithinProviders(<App />, { backend }, false);

    await waitFor(() => {
      expect(getTextReordersSpy).toHaveBeenCalled();
    });
  });

  it('should retrieve word recognitions from backend', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
      getTextReorders: async () => {
        return [];
      },
      getWordRecognitions: async () => {
        return [];
      },
    };
    const getWordRecognitionsSpy = jest.spyOn(backend, 'getWordRecognitions');

    renderWithinProviders(<App />, { backend }, false);

    await waitFor(() => {
      expect(getWordRecognitionsSpy).toHaveBeenCalled();
    });
  });
});
