import { render, screen } from '@testing-library/react';
import Sentence, { SuccessText } from './Sentence';

describe('Sentence', () => {
  it('should display text passed as a sentence prop', async () => {
    render(<Sentence sentence={'Bonjour.'} />);
    expect(screen.queryByText('Bonjour.')).toBeInTheDocument();
  });
});

describe('SuccessText', () => {
  it('should be rendered in the document with success test id', async () => {
    render(<SuccessText sentence={'Bonjour.'} />);
    expect(screen.queryByTestId('success')).toBeInTheDocument();
  });
});
