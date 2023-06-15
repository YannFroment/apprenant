import { createContext } from 'react';
import { SpeechSynth } from '../domain/SpeechSynth';
import { VoiceRecognition } from '../domain/VoiceRecognition';
import { Recorder } from '../domain/Recorder';

export type VoiceRecognitionServiceContainer = {
  voiceRecognition: VoiceRecognition;
  speechSynth: SpeechSynth;
  recorder: Recorder;
};

export const VoiceRecognitionContext =
  createContext<VoiceRecognitionServiceContainer>(
    {} as VoiceRecognitionServiceContainer,
  );
