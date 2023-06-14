import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoiceRecognizer } from './VoiceRecognizer';

describe('VoiceRecognizer', () => {
  it('should render the component', async () => {
    render(<VoiceRecognizer />);

    expect(screen.queryByText('click me')).toBeInTheDocument();
  });

  it('should make a new dom element appear when button is clicked', async () => {
    render(<VoiceRecognizer />);

    await userEvent.click(screen.queryByText('click me')!);

    expect(screen.queryByText('i was clicked')).toBeInTheDocument();
  });
});
