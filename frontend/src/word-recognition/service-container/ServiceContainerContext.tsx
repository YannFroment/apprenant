import { createContext } from 'react';

import { Pictures } from '../domain/Pictures';
import { SpeechRecorderFactory } from '../domain/SpeechRecorderFactory';
import { SpeechSynth } from '../domain/SpeechSynth';

export type WordRecognitionServiceContainer = {
  speechSynth: SpeechSynth;
  speechRecorderFactory: SpeechRecorderFactory;
  pictures: Pictures;
};

export const WordRecognitionContext =
  createContext<WordRecognitionServiceContainer>(
    {} as WordRecognitionServiceContainer,
  );
