import { Navigate } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';
import { useAppContext } from '../service-container/ServiceContainerContext';

export const TextReorder2 = () => {
  const { useTrainingStore } = useAppContext();

  const textReorder = useTrainingStore().useCurrentTextReorder();

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
