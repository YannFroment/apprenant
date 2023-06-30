import { Navigate, useParams } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';
import { useAppContext } from '../service-container/ServiceContainerContext';

const useCurrentTextReorder = () => {
  const { id } = useParams();
  const { useStore } = useAppContext();
  const { textReorders } = useStore();

  return textReorders.find((el) => el.id.toString() === id);
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
