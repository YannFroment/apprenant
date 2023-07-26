import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { TextReorderContainer } from './pages/TextReorderContainer';
import { useAppContext } from './service-container/ServiceContainerContext';
import { WordRecognition } from './trainings/word-recognition';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/text-reorder/:id',
    element: <TextReorderContainer />,
  },
  {
    path: '/word-recognition',
    element: <WordRecognition />,
  },
]);

const useLoadDataBeforeRendering = () => {
  const { backend, useTrainingsStore } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const { setTrainings } = useTrainingsStore();

  useEffect(() => {
    const loadData = async () => {
      const trainings = await backend.getTrainings();
      setTrainings(trainings);
      setIsLoading(false);
    };

    loadData();
  }, [backend, setTrainings]);

  return isLoading;
};

function App() {
  const isLoading = useLoadDataBeforeRendering();

  return (
    <>
      {isLoading ? (
        <div data-testid="loader">loading</div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
