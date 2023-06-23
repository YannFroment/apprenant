import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Exercices } from './pages/exercices';
import { TextReorder } from './text-reorder';
import { VoiceRecognition } from './voice-recognition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Exercices />,
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
    path: '/voice-recognition',
    element: <VoiceRecognition />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
