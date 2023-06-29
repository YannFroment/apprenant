import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createUseStore } from '../../src/store';
import { renderWithinProviders } from '../../tests/utils';
import { BearWrapper } from './zustand';

describe('Zustand', () => {
  it('should toto', async () => {
    renderWithinProviders(<BearWrapper />);

    await userEvent.click(screen.queryByTestId('bear-button')!);

    expect(screen.queryByTestId('bear-title')?.textContent).toBe('1');
  });

  it('should toto', async () => {
    const customStore = createUseStore({ bears: 1 });
    renderWithinProviders(<BearWrapper />, { useStore: customStore });

    await userEvent.click(screen.queryByTestId('bear-button')!);

    expect(screen.queryByTestId('bear-title')?.textContent).toBe('2');
  });
});
