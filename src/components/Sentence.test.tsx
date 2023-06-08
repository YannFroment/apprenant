import { render, screen } from '@testing-library/react';
import Sentence, { NeutralText, SuccessText } from './Sentence';

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

describe('NeutralText', () => {
  it('should be rendered in the document with neutral test id', async () => {
    render(<NeutralText sentence={'Bonjour.'} />);
    expect(screen.queryByTestId('neutral')).toBeInTheDocument();
  });
});
