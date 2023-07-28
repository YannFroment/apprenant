import { Navigate, useParams } from 'react-router-dom';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { Layout } from '../views/layouts/Layout';
import { WordRecognition, WordRecognitionProps } from '../trainings/word-recognition';

const useWordRecognitionById = (id: string | undefined) => {
  const { useTrainingsStore } = useAppContext();
  const { wordRecognitions } = useTrainingsStore();

  return wordRecognitions.find((wordRecognition) => wordRecognition.id.toString() === id);
};

export const WordRecognitionContainer = () => {
  const { id } = useParams();
  const wordRecognition = useWordRecognitionById(id)

  if (!wordRecognition) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div>{wordRecognition.title}</div>
      <WordRecognition id={wordRecognition.id} title={wordRecognition.title} words={wordRecognition.words} />
    </Layout>
  );
};
