import { waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';

describe('App', () => {
  it('should try to auto log in', async () => {
    const spyOnAutoLogIn = jest.spyOn(inMemoryBackend, 'autoLogIn');

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(spyOnAutoLogIn).toHaveBeenCalled();
    });
  });
});
