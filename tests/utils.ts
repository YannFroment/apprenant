import { VoiceRecognitionServiceContainer } from '../src/voice-recognition/service-container/ServiceContainerContext';

export const defaultContainer: VoiceRecognitionServiceContainer = {
  voiceRecognition: { recognize: () => true },
  speechSynth: { speak: () => {} },
};

export const createContainer = (
  overrideContainer: Partial<VoiceRecognitionServiceContainer>,
): VoiceRecognitionServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};
