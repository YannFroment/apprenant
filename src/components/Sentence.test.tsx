import { render, screen } from '@testing-library/react';
import Sentence from './Sentence';

describe('Sentence', () => {
  it('foo', async () => {
    render(<Sentence sentence={'Bonjour.'} />);
    expect(screen.queryByText('Bonjour.')).toBeInTheDocument();
  });
});
