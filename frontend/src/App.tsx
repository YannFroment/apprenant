import { useEffect, useState } from 'react';
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

const useLoadDataBeforeRendering = () => {
  const { backend } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const { setTextReorders } = useTrainingsStore();

  useEffect(() => {
    const loadData = async () => {
      const result = await backend.getTextReorders();
      setTextReorders(result);
      setIsLoading(false);
    };

    loadData();
  }, [backend, setTextReorders]);

  return isLoading;
};

function App() {
  const isLoading = useLoadDataBeforeRendering();

  return (
    <>{isLoading ? <div>loading</div> : <RouterProvider router={router} />}</>
  );
}

export default App;
