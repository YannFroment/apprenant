import { render, within, screen, waitFor } from '@testing-library/react';
import { Word } from './Word';
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
      within(screen.queryByTestId('chat')!).queryByTestId('listen-chat'),
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

  it('should display a Picture component', async () => {
    render(
      <TestContainer>
        <Word word={'chat'} />
      </TestContainer>,
    );

    await waitFor(() => {
      expect(
        within(screen.queryByTestId('chat')!).getByTestId('img-chat'),
      ).toBeInTheDocument();
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
