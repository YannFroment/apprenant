import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { backend } from './external-services/Backend';
import { pexelPictures } from './external-services/Pictures';
import { windowSpeechSynth } from './external-services/SpeechSynth';
import { windowSpeechRecorderFactory } from './external-services/WindowSpeechRecorderFactory';
import { Dashboard } from './pages/Dashboard';
import {
  AppContext,
  ServiceContainer,
  StoreState,
} from './service-container/ServiceContainerContext';
import { TextReorder } from './text-reorder';
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
    path: '/word-recognition',
    element: <WordRecognition />,
  },
]);

export const createUseStore = (
  args: Partial<StoreState> = {},
): UseBoundStore<StoreApi<StoreState>> => {
  return create<StoreState>((set) => ({
    bears: args.bears ?? 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    increasePopulationBy: (by: number) =>
      set((state) => ({ bears: state.bears + by })),
  }));
};

const context: ServiceContainer = {
  speechSynth: windowSpeechSynth,
  speechRecorderFactory: windowSpeechRecorderFactory,
  pictures: pexelPictures,
  backend: backend,
  useStore: createUseStore(),
};

function App() {
  return (
    <AppContext.Provider value={context}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
