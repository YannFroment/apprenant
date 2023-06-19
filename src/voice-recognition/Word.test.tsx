import { render, within, screen } from '@testing-library/react';
import { Word } from './Word';
import userEvent from '@testing-library/user-event';
import { TestContainer } from '../../tests/utils';

describe('Word', () => {
  it('should display the word name', () => {
    render(
      <TestContainer>
        <Word word={'chat'} />
      </TestContainer>,
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText('chat'),
    ).toBeInTheDocument();
  });

  it('should display a button to hear', () => {
    render(
      <TestContainer>
        <Word word={'chat'} />
      </TestContainer>,
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText('Écouter'),
    ).toBeInTheDocument();
  });

  it('should display a button to record', () => {
    render(
      <TestContainer>
        <Word word={'chat'} />
      </TestContainer>,
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
    ).toBeInTheDocument();
  });

  it('should display an image', () => {
    render(
      <TestContainer>
        <Word word={'chat'} />
      </TestContainer>,
    );

    expect(
      within(screen.queryByTestId('chat')!)
        .getByTestId('img-chat')
        .getAttribute('src'),
    ).toBe('chat.jpg');
  });

  describe('play audio', () => {
    it('should call the voice synthetiser for a given word when clicking on the "hear" button', async () => {
      const speechSynth = {
        speak: () => {},
      };

      const spyOnSpeak = jest.spyOn(speechSynth, 'speak');

      render(
        <TestContainer overrideServices={{ speechSynth }}>
          <Word word={'chat'} />
        </TestContainer>,
      );

      await userEvent.click(
        within(screen.queryByTestId('chat')!).getByText('Écouter'),
      );

      expect(spyOnSpeak).toHaveBeenCalledWith('chat');
    });
  });

  it('should display VoiceRecognition component', () => {
    render(
      <TestContainer>
        <Word word={'chat'} />
      </TestContainer>,
    );
    expect(screen.queryByTestId('chat-speech-recorder')).toBeInTheDocument();
  });
});
