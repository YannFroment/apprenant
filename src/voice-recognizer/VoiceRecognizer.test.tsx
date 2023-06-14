import { render, screen } from '@testing-library/react';
import { VoiceRecognizer } from './VoiceRecognizer';

describe('VoiceRecognizer', () => {
  it('should do stuff', async () => {
    render(<VoiceRecognizer />);

    expect(screen.queryByText('toto')).toBeInTheDocument();
  });
});
