import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { backend } from './external-services/Backend';
import { pexelPictures } from './external-services/Pictures';
import { windowSpeechSynth } from './external-services/SpeechSynth';
import { windowSpeechRecorderFactory } from './external-services/WindowSpeechRecorderFactory';
import { Dashboard } from './pages/Dashboard';
import {
  AppContext,
  ServiceContainer,
} from './service-container/ServiceContainerContext';
import { useTrainingsStore } from './store';
import { TextReorder } from './text-reorder';
import { TextReorder2 } from './text-reorder-2';
import { WordRecognition } from './word-recognition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/text-reorder',
    element: (
      <TextReorder
        orderedSentences={['Phrase 1', 'Phrase 2', 'Phrase 3']}
        randomizedSentences={['Phrase 3', 'Phrase 1', 'Phrase 2']}
      />
    ),
  },
  {
    path: '/text-reorder/:id',
    element: <TextReorder2 />,
  },
  {
    path: '/word-recognition',
    element: <WordRecognition />,
  },
]);

const context: ServiceContainer = {
  speechSynth: windowSpeechSynth,
  speechRecorderFactory: windowSpeechRecorderFactory,
  pictures: pexelPictures,
  backend: backend,
  useTrainingsStore,
};

function App() {
  return (
    <AppContext.Provider value={context}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
