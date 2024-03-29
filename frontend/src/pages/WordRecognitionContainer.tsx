import { Navigate, useParams } from 'react-router-dom';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { WordRecognition } from '../trainings/word-recognition';
import { Layout } from '../views/layouts/Layout';

const useWordRecognitionById = (id: string | undefined) => {
  const { useTrainingsStore } = useAppContext();
  const { wordRecognitions } = useTrainingsStore();

  return wordRecognitions.find(
    (wordRecognition) => wordRecognition.id.toString() === id,
  );
};

export const WordRecognitionContainer = () => {
  const { id } = useParams();
  const wordRecognition = useWordRecognitionById(id);

  if (!wordRecognition) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div>{wordRecognition.title}</div>
      <WordRecognition words={wordRecognition.words} />
    </Layout>
  );
};
