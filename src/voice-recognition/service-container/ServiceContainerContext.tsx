import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { Recorder } from '../domain/Recorder';
import { Pictures } from '../domain/Pictures';

export type VoiceRecognitionServiceContainer = {
  speechSynth: SpeechSynth;
  recorder: Recorder;
  pictures: Pictures;
};

export const VoiceRecognitionContext =
  createContext<VoiceRecognitionServiceContainer>(
    {} as VoiceRecognitionServiceContainer,
  );
