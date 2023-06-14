import { createContext } from 'react';

type VoiceRecognition = {
  recognize: () => void;
};

export type ServiceContainer = {
  voiceRecognition: VoiceRecognition;
};

export const ServiceContainerContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);
