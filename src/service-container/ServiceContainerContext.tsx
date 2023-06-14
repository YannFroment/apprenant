import { createContext } from 'react';

type VoiceRecognition = {
  recognize: () => boolean;
};

type SpeechSynth = {
  speak: (word: string) => void;
};

export type ServiceContainer = {
  voiceRecognition: VoiceRecognition;
  speechSynth: SpeechSynth;
};

export const ServiceContainerContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);
