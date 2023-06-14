import { useState } from 'react';

type UseVoiceRecognitionReturn = {
  isRecording: boolean;
  clickRecordButton: () => void;
};

type useVoiceRecognitionArgs = {
  defaultIsRecording?: boolean;
};

export const useVoiceRecognition = ({
  defaultIsRecording,
}: useVoiceRecognitionArgs = {}): UseVoiceRecognitionReturn => {
  const [isRecording, setIsRecording] = useState<boolean>(
    defaultIsRecording ?? false,
  );

  const clickRecordButton = () => {
    setIsRecording(!isRecording);
  };

  return { isRecording, clickRecordButton };
};
