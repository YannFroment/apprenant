import './css-reset.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App.tsx';
import { backend } from './external-services/Backend.ts';
import { pexelPictures } from './external-services/Pictures.ts';
import { windowSpeechSynth } from './external-services/SpeechSynth.ts';
import { windowSpeechRecorderFactory } from './external-services/WindowSpeechRecorderFactory.ts';
import {
  AppContext,
  ServiceContainer,
} from './service-container/ServiceContainerContext.tsx';
import { useTrainingsStore } from './store/useTrainingsStore.ts';
import { theme } from './theme.ts';

const context: ServiceContainer = {
  speechSynth: windowSpeechSynth,
  speechRecorderFactory: windowSpeechRecorderFactory,
  pictures: pexelPictures,
  backend: backend,
  useTrainingsStore,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
