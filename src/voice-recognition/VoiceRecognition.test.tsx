import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoiceRecognition } from './VoiceRecognition';
import {
  ServiceContainer,
  ServiceContainerContext,
} from '../service-container/ServiceContainerContext';

const defaultContainer: ServiceContainer = {
  voiceRecognition: { recognize: () => true },
  speechSynth: { speak: () => {} },
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

  it('should not change record button text for a word when clicking record button for another word', async () => {
    render(
      <ServiceContainerContext.Provider value={defaultContainer}>
        <VoiceRecognition words={['chat', 'chien']} />
      </ServiceContainerContext.Provider>,
    );
    await userEvent.click(
      within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText(
        "Arrêter l'enregistrement",
      ),
    ).toBeInTheDocument;

    expect(within(screen.queryByTestId('chien')!).getByText('Enregistrer'))
      .toBeInTheDocument;
  });
});
