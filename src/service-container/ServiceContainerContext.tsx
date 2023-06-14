import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { VoiceRecognition } from '../domain/VoiceRecognition';

export type ServiceContainer = {
  voiceRecognition: VoiceRecognition;
  speechSynth: SpeechSynth;
};

export const ServiceContainerContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);
