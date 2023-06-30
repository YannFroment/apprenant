import { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { useAppContext } from './service-container/ServiceContainerContext';
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

function App() {
  const { backend } = useAppContext();

  const { setTextReorders } = useTrainingsStore();

  useEffect(() => {
    const fetchData = async () => {
      const result = await backend.getTextReorders();
      setTextReorders(result);
      console.log(result);
    };

    fetchData();
  }, [backend, setTextReorders]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
