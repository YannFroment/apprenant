import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';

type VoiceRecognition = {
  recognize: () => boolean;
};

export type ServiceContainer = {
  voiceRecognition: VoiceRecognition;
  speechSynth: SpeechSynth;
};

export const ServiceContainerContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);
