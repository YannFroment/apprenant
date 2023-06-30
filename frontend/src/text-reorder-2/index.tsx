import { useParams } from 'react-router-dom';

import { Layout } from '../pages/layouts/Layout';

export const TextReorder2 = () => {
  const { id } = useParams();

  return <Layout>{id}</Layout>;
};
