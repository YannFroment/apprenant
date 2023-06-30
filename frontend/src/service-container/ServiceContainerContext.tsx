import { createContext, useContext } from 'react';

import { Backend, TextReorder } from '../domain/Backend';
import { Pictures } from '../domain/Pictures';
import { SpeechRecorderFactory } from '../domain/SpeechRecorderFactory';
import { SpeechSynth } from '../domain/SpeechSynth';
import { UseTrainingStore } from '../store';

export type ServiceContainer = {
  speechSynth: SpeechSynth;
  speechRecorderFactory: SpeechRecorderFactory;
  pictures: Pictures;
  backend: Backend;
  useTrainingStore: UseTrainingStore;
};

export const AppContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);

export const useAppContext = () => useContext(AppContext);
