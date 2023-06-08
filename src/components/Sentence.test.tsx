import { render, screen } from '@testing-library/react';
import Sentence from './Sentence';

describe('Sentence', () => {
  it('should display text passed as a sentence prop', async () => {
    render(<Sentence sentence={'Bonjour.'} />);
    expect(screen.queryByText('Bonjour.')).toBeInTheDocument();
  });
});
