import { Navigate } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';
import { useAppContext } from '../service-container/ServiceContainerContext';

export const TextReorder2 = () => {
  const { useTrainingsStore } = useAppContext();

  const textReorder = useTrainingsStore().useCurrentTextReorder();

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
