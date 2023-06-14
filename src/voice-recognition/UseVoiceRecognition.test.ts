import { renderHook, waitFor } from '@testing-library/react';
import { useVoiceRecognition } from './UseVoiceRecognition';

describe('use voice recognition', () => {
  it('should not record by default', async () => {
    const { result } = renderHook(useVoiceRecognition);

    await waitFor(() => expect(result.current.isRecording).toBe(false));
  });
});
