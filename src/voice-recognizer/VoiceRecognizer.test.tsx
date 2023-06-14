import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoiceRecognizer } from './VoiceRecognizer';
import {
  ServiceContainer,
  ServiceContainerContext,
} from '../service-container/ServiceContainerContext';

describe('VoiceRecognizer', () => {
  it('should render the component', async () => {
    render(<VoiceRecognizer />);

    expect(screen.queryByText('click me')).toBeInTheDocument();
  });

  it('should display a list of words', async () => {
    const words = ['chat', 'chien', 'oiseau'];
    render(<VoiceRecognizer words={words} />);

    expect(screen.queryByText('chat')).toBeInTheDocument();
    expect(screen.queryByText('chien')).toBeInTheDocument();
    expect(screen.queryByText('oiseau')).toBeInTheDocument();
  });

  it('should detect if recognition is a match', async () => {
    const context: ServiceContainer = {
      voiceRecognition: {
        recognize: () => true,
      },
    };
    render(
      <ServiceContainerContext.Provider value={context}>
        <VoiceRecognizer />
      </ServiceContainerContext.Provider>,
    );

    await userEvent.click(screen.queryByText('click me')!);

    expect(screen.queryByText('it is a match!')).toBeInTheDocument();
  });

  it('should detect if recognition is not a match', async () => {
    const context: ServiceContainer = {
      voiceRecognition: {
        recognize: () => false,
      },
    };
    render(
      <ServiceContainerContext.Provider value={context}>
        <VoiceRecognizer />
      </ServiceContainerContext.Provider>,
    );

    await userEvent.click(screen.queryByText('click me')!);

    expect(screen.queryByText('not a match!')).toBeInTheDocument();
  });
});
