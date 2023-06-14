import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoiceRecognizer } from './VoiceRecognizer';
import {
  ServiceContainer,
  ServiceContainerContext,
} from '../service-container/ServiceContainerContext';

describe('VoiceRecognizer', () => {
  it('should display a component for each word of the list of words', async () => {
    const words = ['chat', 'chien', 'oiseau'];
    render(<VoiceRecognizer words={words} />);

    expect(screen.queryByTestId('chat')).toBeInTheDocument();
    expect(screen.queryByTestId('chien')).toBeInTheDocument();
    expect(screen.queryByTestId('oiseau')).toBeInTheDocument();
  });

  describe('for each word of the list', () => {
    it('should display the word name', () => {
      const words = ['chat'];
      render(<VoiceRecognizer words={words} />);

      expect(
        within(screen.queryByTestId('chat')!).getByText('chat'),
      ).toBeInTheDocument();
    });

    it('should display a button to hear', () => {
      const words = ['chat'];
      render(<VoiceRecognizer words={words} />);

      expect(
        within(screen.queryByTestId('chat')!).getByText('Écouter'),
      ).toBeInTheDocument();
    });

    it('should display a button to record', () => {
      const words = ['chat'];
      render(<VoiceRecognizer words={words} />);

      expect(
        within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
      ).toBeInTheDocument();
    });
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
