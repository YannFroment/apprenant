import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'zustand';

import { renderWithinProviders } from '../../tests/utils';
import { StoreState } from '../service-container/ServiceContainerContext';
import { BearWrapper } from './zustand';

describe('Zustand', () => {
  it('should toto', async () => {
    renderWithinProviders(<BearWrapper />);

    await userEvent.click(screen.queryByTestId('bear-button')!);

    expect(screen.queryByTestId('bear-title')?.textContent).toBe('1');
  });

  it('should toto', async () => {
    const customStore = create<StoreState>((set) => ({
      bears: 1,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      increasePopulationBy: (by: number) =>
        set((state) => ({ bears: state.bears + by })),
    }));
    renderWithinProviders(<BearWrapper />, { useStore: customStore });

    await userEvent.click(screen.queryByTestId('bear-button')!);

    expect(screen.queryByTestId('bear-title')?.textContent).toBe('2');
  });
});
