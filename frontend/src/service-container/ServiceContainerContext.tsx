import { createContext } from 'react';

import { Pictures } from '../word-recognition/domain/Pictures';
import { SpeechRecorderFactory } from '../word-recognition/domain/SpeechRecorderFactory';
import { SpeechSynth } from '../word-recognition/domain/SpeechSynth';

export type ServiceContainer = {
  speechSynth: SpeechSynth;
  speechRecorderFactory: SpeechRecorderFactory;
  pictures: Pictures;
};

export const AppContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);
