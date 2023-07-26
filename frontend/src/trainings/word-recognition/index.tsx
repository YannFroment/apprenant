import { Layout } from '../../views/layouts/Layout';
import { Medias } from './Medias';

export const WordRecognition = () => {
  return (
    <Layout>
      <Medias words={['voiture', 'bus', 'camion']} />
    </Layout>
  );
};
