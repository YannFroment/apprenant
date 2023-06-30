import { useParams } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';
import { useTrainingsStore } from '../store';

export const TextReorder2 = () => {
  const { id } = useParams();
  const { textReorders } = useTrainingsStore();
  const title = textReorders.find((el) => el.id.toString() === id)?.title;

  return (
    <Layout>
      <p>{id}</p>
      <div>{title}</div>
    </Layout>
  );
};
