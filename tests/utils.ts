import { ServiceContainer } from '../src/service-container/ServiceContainerContext';

export const defaultContainer: ServiceContainer = {
  voiceRecognition: { recognize: () => true },
  speechSynth: { speak: () => {} },
};

export const createContainer = (
  overrideContainer: Partial<ServiceContainer>,
): ServiceContainer => {
  return { ...defaultContainer, ...overrideContainer };
};
