import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestContainer } from '../../tests/utils';
import { Listen } from './Listen';

describe('play audio', () => {
  it('should call the voice synthetiser for a given word when clicking on the "hear" button', async () => {
    const speechSynth = {
      speak: () => {},
    };

    const spyOnSpeak = jest.spyOn(speechSynth, 'speak');

    render(
      <TestContainer overrideServices={{ speechSynth }}>
        <Listen word={'chat'} />
      </TestContainer>,
    );

    await userEvent.click(screen.getByText('Écouter'));

    expect(spyOnSpeak).toHaveBeenCalledWith('chat');
  });
});
