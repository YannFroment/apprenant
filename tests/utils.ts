import { VoiceRecognitionServiceContainer } from '../src/voice-recognition/service-container/ServiceContainerContext';

export const defaultContainer: VoiceRecognitionServiceContainer = {
  speechSynth: { speak: () => {} },
  recorder: () => {
    return {
      start: () => {},
      stop: () => {},
    };
  },
};

export const createContainer = (
  overrideContainer: Partial<VoiceRecognitionServiceContainer>,
): VoiceRecognitionServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};
