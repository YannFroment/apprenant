import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { Recorder } from '../domain/Recorder';

export type VoiceRecognitionServiceContainer = {
  speechSynth: SpeechSynth;
  recorder: Recorder;
};

export const VoiceRecognitionContext =
  createContext<VoiceRecognitionServiceContainer>(
    {} as VoiceRecognitionServiceContainer,
  );
