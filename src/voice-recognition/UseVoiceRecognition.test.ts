import { renderHook, waitFor, act } from '@testing-library/react';
import { useVoiceRecognition } from './UseVoiceRecognition';

describe('use voice recognition', () => {
  it('should not record by default', async () => {
    const { result } = renderHook(useVoiceRecognition);

    await waitFor(() => expect(result.current.isRecording).toBe(false));
  });

  describe('clickRecordButton', () => {
    it('should set isRecording to true if isRecording was false', async () => {
      const { result } = renderHook(useVoiceRecognition);

      await act(() => result.current.clickRecordButton());

      await waitFor(() => expect(result.current.isRecording).toBe(true));
    });
  });
});
