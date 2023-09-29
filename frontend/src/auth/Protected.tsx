import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppContext } from '../service-container/ServiceContainerContext';

export const Protected = ({ children }: { children: ReactNode }) => {
  const { useAuthStore } = useAppContext();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
