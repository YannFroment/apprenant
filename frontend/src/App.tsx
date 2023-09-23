import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Protected } from './auth/Protected';
import { Dashboard } from './pages/Dashboard';
import { TextReorderContainer } from './pages/TextReorderContainer';
import { WordRecognitionContainer } from './pages/WordRecognitionContainer';
import { useAppContext } from './service-container/ServiceContainerContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/text-reorder/:id',
    element: (
      <Protected>
        <TextReorderContainer />
      </Protected>
    ),
  },
  {
    path: '/word-recognition/:id',
    element: <WordRecognitionContainer />,
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

const useAutoLogin = () => {
  const { backend, useAuthStore } = useAppContext();
  const { setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    backend.autoLogIn().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  }, [backend, useAuthStore, setIsLoggedIn]);
};

function App() {
  const isLoading = useLoadDataBeforeRendering();
  useAutoLogin();

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
