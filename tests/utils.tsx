import { ReactNode } from 'react';
import {
  VoiceRecognitionContext,
  VoiceRecognitionServiceContainer,
} from '../src/voice-recognition/service-container/ServiceContainerContext';

const defaultContainer: VoiceRecognitionServiceContainer = {
  speechSynth: { speak: () => {} },
  recorder: () => {
    return {
      start: () => {},
      stop: () => {},
    };
  },
};

const createContainer = (
  overrideContainer: Partial<VoiceRecognitionServiceContainer>,
): VoiceRecognitionServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};

export const TestContainer = ({
  children,
  overrideServices,
}: {
  children: ReactNode;
  overrideServices?: Partial<VoiceRecognitionServiceContainer>;
}) => {
  const container = createContainer(overrideServices ?? {});
  return (
    <VoiceRecognitionContext.Provider value={container}>
      {children}
    </VoiceRecognitionContext.Provider>
  );
};
