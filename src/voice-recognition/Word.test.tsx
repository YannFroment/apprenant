import { render, within, screen, waitFor } from '@testing-library/react';
import { Word } from './Word';
import { TestContainer } from '../../tests/utils';
import { Pictures } from './domain/Pictures';

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

  it('should display an image', async () => {
    const pictures: Pictures = {
      get: async () => {
        return 'chat.jpg';
      },
    };

    render(
      <TestContainer overrideServices={{ pictures }}>
        <Word word={'chat'} />
      </TestContainer>,
    );

    await waitFor(() => {
      expect(
        within(screen.queryByTestId('chat')!)
          .getByTestId('img-chat')
          .getAttribute('src'),
      ).toBe('chat.jpg');
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
