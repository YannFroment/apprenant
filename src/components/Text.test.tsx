import { screen, render } from '@testing-library/react';
import { SuccessText, NeutralText } from './Text';

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
