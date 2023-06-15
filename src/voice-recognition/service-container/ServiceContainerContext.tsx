import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { VoiceRecognition } from '../domain/VoiceRecognition';

export type VoiceRecognitionServiceContainer = {
  voiceRecognition: VoiceRecognition;
  speechSynth: SpeechSynth;
};

export const VoiceRecognitionContext =
  createContext<VoiceRecognitionServiceContainer>(
    {} as VoiceRecognitionServiceContainer,
  );
