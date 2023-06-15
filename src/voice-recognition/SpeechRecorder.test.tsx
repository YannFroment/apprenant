import { render, within, screen } from '@testing-library/react';
import { SpeechRecorder } from './SpeechRecorder';

describe('SpeechRecorder', () => {
  it('should display a button to record', () => {
    render(<SpeechRecorder />);

    expect(
      within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
    ).toBeInTheDocument();
  });
});
