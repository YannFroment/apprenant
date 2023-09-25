import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from './auth/Login';
import { Protected } from './auth/Protected';
import { Dashboard } from './pages/Dashboard';
import { TextReorderContainer } from './pages/TextReorderContainer';
import { WordRecognitionContainer } from './pages/WordRecognitionContainer';
import { useAppContext } from './service-container/ServiceContainerContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <Login />,
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
    element: (
      <Protected>
        <WordRecognitionContainer />
      </Protected>
    ),
  },
]);

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
  useAutoLogin();

  return <RouterProvider router={router} />;
}

export default App;
