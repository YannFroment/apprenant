import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { CreateSpeechRecorder } from '../domain/CreateSpeechRecorder';
import { Pictures } from '../domain/Pictures';

export type VoiceRecognitionServiceContainer = {
  speechSynth: SpeechSynth;
  createSpeechRecorder: CreateSpeechRecorder;
  pictures: Pictures;
};

export const VoiceRecognitionContext =
  createContext<VoiceRecognitionServiceContainer>(
    {} as VoiceRecognitionServiceContainer,
  );
