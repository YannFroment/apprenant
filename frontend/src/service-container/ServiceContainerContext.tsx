import { createContext, useContext } from 'react';

import { Pictures } from '../domain/Pictures';
import { SpeechRecorderFactory } from '../domain/SpeechRecorderFactory';
import { SpeechSynth } from '../domain/SpeechSynth';

export type ServiceContainer = {
  speechSynth: SpeechSynth;
  speechRecorderFactory: SpeechRecorderFactory;
  pictures: Pictures;
};

export const AppContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);

export const useAppContext = () => useContext(AppContext);
