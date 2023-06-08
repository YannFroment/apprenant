import { render, screen } from '@testing-library/react';
import Sentence, { SentencesPool } from './Sentence';

describe('Sentences', () => {
  it('should display all sentences', () => {
    render(<SentencesPool sentences={['Bonjour.', 'Il fait beau.']} />);
    expect(screen.queryByText('Bonjour.')).toBeInTheDocument();
    expect(screen.queryByText('Il fait beau.')).toBeInTheDocument();
  });
});

describe('Sentence', () => {
  it('should display text passed as a sentence prop', async () => {
    render(<Sentence sentence={'Bonjour.'} goodIndex={0} suggestedIndex={0} />);
    expect(screen.queryByText('Bonjour.')).toBeInTheDocument();
  });
  it('should display successText component if goodIndex equals suggestedIndex', () => {
    render(<Sentence sentence={'Bonjour.'} goodIndex={0} suggestedIndex={0} />);
    expect(screen.queryByTestId('success')).toBeInTheDocument();
  });
  it('should display neutralText component if goodIndex do not equals suggestedIndex', () => {
    render(<Sentence sentence={'Bonjour.'} goodIndex={0} suggestedIndex={1} />);
    expect(screen.queryByTestId('neutral')).toBeInTheDocument();
  });
});
