type UseVoiceRecognitionReturn = {
  isRecording: boolean;
};

export const useVoiceRecognition = (): UseVoiceRecognitionReturn => {
  return { isRecording: false };
};
