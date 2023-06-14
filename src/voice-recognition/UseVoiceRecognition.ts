import { useState } from 'react';

type UseVoiceRecognitionReturn = {
  isRecording: boolean;
  clickRecordButton: () => void;
};

type useVoiceRecognitionArgs = {
  defaultIsRecording: boolean;
};

export const useVoiceRecognition = (
  { defaultIsRecording }: useVoiceRecognitionArgs = {
    defaultIsRecording: false,
  },
): UseVoiceRecognitionReturn => {
  const [isRecording, setIsRecording] = useState(defaultIsRecording);

  const clickRecordButton = () => {
    setIsRecording(!isRecording);
  };

  return { isRecording, clickRecordButton };
};
