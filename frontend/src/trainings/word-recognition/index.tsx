import { Layout } from '../../views/layouts/Layout';
import { WordsContainer } from './WordsContainer';

export const WordRecognition = () => {
  return (
    <Layout>
      <WordsContainer words={['voiture', 'bus', 'camion']} />
    </Layout>
  );
};
