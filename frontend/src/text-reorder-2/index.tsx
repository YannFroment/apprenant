import { Navigate } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';
import { useAppContext } from '../service-container/ServiceContainerContext';

const useCurrentTextReorder = () => {
  const { useTrainingsStore } = useAppContext();
  return useTrainingsStore().useCurrentTextReorder();
};

export const TextReorder2 = () => {
  const textReorder = useCurrentTextReorder();

  if (!textReorder) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <p>{textReorder?.id}</p>
      <div>{textReorder?.title}</div>
    </Layout>
  );
};
