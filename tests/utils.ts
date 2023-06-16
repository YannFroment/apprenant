import { Recorder } from '../src/voice-recognition/domain/Recorder';
import { VoiceRecognitionServiceContainer } from '../src/voice-recognition/service-container/ServiceContainerContext';

export const defaultContainer: VoiceRecognitionServiceContainer = {
  speechSynth: { speak: () => {} },
  recorder: () => ({} as ReturnType<Recorder>),
};

export const createContainer = (
  overrideContainer: Partial<VoiceRecognitionServiceContainer>,
): VoiceRecognitionServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};
