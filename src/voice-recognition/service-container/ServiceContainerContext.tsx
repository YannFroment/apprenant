import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { SpeechRecorderFactory } from '../domain/SpeechRecorderFactory';
import { Pictures } from '../domain/Pictures';

export type VoiceRecognitionServiceContainer = {
  speechSynth: SpeechSynth;
  speechRecorderFactory: SpeechRecorderFactory;
  pictures: Pictures;
};

export const VoiceRecognitionContext =
  createContext<VoiceRecognitionServiceContainer>(
    {} as VoiceRecognitionServiceContainer,
  );
