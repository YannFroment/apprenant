import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoiceRecognition } from './VoiceRecognition';
import {
  ServiceContainer,
  ServiceContainerContext,
} from '../service-container/ServiceContainerContext';

const defaultContainer: ServiceContainer = {
  voiceRecognition: { recognize: () => true },
  speechSynth: { speak: (word: string) => {} },
};

const createContainer = (
  overrideContainer: Partial<ServiceContainer>,
): ServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

describe('VoiceRecognition', () => {
  it('should display a component for each word of the list of words', async () => {
    const words = ['chat', 'chien', 'oiseau'];
    render(<VoiceRecognition words={words} />);

    expect(screen.queryByTestId('chat')).toBeInTheDocument();
    expect(screen.queryByTestId('chien')).toBeInTheDocument();
    expect(screen.queryByTestId('oiseau')).toBeInTheDocument();
  });

  describe('for each word of the list', () => {
    it('should display the word name', () => {
      const words = ['chat'];
      render(<VoiceRecognition words={words} />);

      expect(
        within(screen.queryByTestId('chat')!).getByText('chat'),
      ).toBeInTheDocument();
    });

    it('should display a button to hear', () => {
      const words = ['chat'];
      render(<VoiceRecognition words={words} />);

      expect(
        within(screen.queryByTestId('chat')!).getByText('Écouter'),
      ).toBeInTheDocument();
    });

    it('should display a button to record', () => {
      const words = ['chat'];
      render(<VoiceRecognition words={words} />);

      expect(
        within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
      ).toBeInTheDocument();
    });
  });

  it('should detect if recognition is a match', async () => {
    const container = createContainer({
      voiceRecognition: { recognize: () => true },
    });
    render(
      <ServiceContainerContext.Provider value={container}>
        <VoiceRecognition />
      </ServiceContainerContext.Provider>,
    );

    await userEvent.click(screen.queryByText('click me')!);

    expect(screen.queryByText('it is a match!')).toBeInTheDocument();
  });

  it('should detect if recognition is not a match', async () => {
    const container = createContainer({
      voiceRecognition: { recognize: () => false },
    });
    render(
      <ServiceContainerContext.Provider value={container}>
        <VoiceRecognition />
      </ServiceContainerContext.Provider>,
    );

    await userEvent.click(screen.queryByText('click me')!);

    expect(screen.queryByText('not a match!')).toBeInTheDocument();
  });

  describe('play audio', () => {
    it('should call the voice synthetiser for a given word when clicking on the "hear" button', async () => {
      const speechSynth = {
        speak: (word: string) => {},
      };

      const spyOnSpeak = jest.spyOn(speechSynth, 'speak');

      const container = createContainer({
        speechSynth,
      });

      render(
        <ServiceContainerContext.Provider value={container}>
          <VoiceRecognition words={['chat']} />
        </ServiceContainerContext.Provider>,
      );

      await userEvent.click(
        within(screen.queryByTestId('chat')!).getByText('Écouter'),
      );

      expect(spyOnSpeak).toHaveBeenCalledWith('chat');
    });
  });
});
