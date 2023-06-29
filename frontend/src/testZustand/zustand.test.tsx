import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BearWrapper } from './zustand';

describe('Zustand', () => {
  it('should toto', async () => {
    render(<BearWrapper />);

    await userEvent.click(screen.queryByTestId('bear-button')!);

    expect(screen.queryByTestId('bear-title')?.textContent).toBe('1');
  });
});
