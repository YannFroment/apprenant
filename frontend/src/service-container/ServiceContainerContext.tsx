import { createContext, useContext } from 'react';

import { Backend } from '../domain/Backend';
import { Pictures } from '../domain/Pictures';
import { SpeechRecorderFactory } from '../domain/SpeechRecorderFactory';
import { SpeechSynth } from '../domain/SpeechSynth';
import { Storage } from '../domain/Storage';
import { UseAuthStore } from '../store/useAuthStore';
import { UseTrainingsStore } from '../store/useTrainingsStore';

export type ServiceContainer = {
  speechSynth: SpeechSynth;
  speechRecorderFactory: SpeechRecorderFactory;
  pictures: Pictures;
  backend: Backend;
  useTrainingsStore: UseTrainingsStore;
  useAuthStore: UseAuthStore;
  storage: Storage;
};

export const AppContext = createContext<ServiceContainer>(
  {} as ServiceContainer,
);

export const useAppContext = () => useContext(AppContext);
