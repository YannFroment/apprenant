import { useState } from 'react';

type UseVoiceRecognitionReturn = {
  isRecording: boolean;
  clickRecordButton: () => void;
};

export const useVoiceRecognition = (): UseVoiceRecognitionReturn => {
  const [isRecording, setIsRecording] = useState(false);

  const clickRecordButton = () => {
    setIsRecording(true);
  };

  return { isRecording, clickRecordButton };
};
