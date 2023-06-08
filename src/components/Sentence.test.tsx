import { render, screen } from '@testing-library/react';
import Sentence, { GreenText } from './Sentence';

describe('Sentence', () => {
  it('should display text passed as a sentence prop', async () => {
    render(<Sentence sentence={'Bonjour.'} />);
    expect(screen.queryByText('Bonjour.')).toBeInTheDocument();
  });
});

describe('GreenText', () => {
  it('should toto', async () => {
    render(<GreenText sentence={'Bonjour.'} />);
    expect(screen.queryByTestId('success')).toBeInTheDocument();
  });
});
