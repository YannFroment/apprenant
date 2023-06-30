import { Navigate, useParams } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';
import { useTrainingsStore } from '../store';

export const TextReorder2 = () => {
  const { id } = useParams();
  const { textReorders } = useTrainingsStore();

  const textReorder = textReorders.find((el) => el.id.toString() === id);

  if (!textReorder) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <p>{id}</p>
      <div>{textReorder.title}</div>
    </Layout>
  );
};
