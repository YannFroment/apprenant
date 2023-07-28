import { Navigate, useParams } from 'react-router-dom';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { TextReorder } from '../trainings/text-reorder';
import { Layout } from '../views/layouts/Layout';

const useTextReorderById = (id: string | undefined) => {
  const { useTrainingsStore } = useAppContext();
  const { textReorders } = useTrainingsStore();

  return textReorders.find((textReorder) => textReorder.id.toString() === id);
};

export const TextReorderContainer = () => {
  const { id } = useParams();
  const textReorder = useTextReorderById(id);

  if (!textReorder) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div>{textReorder.title}</div>
      <TextReorder
        orderedSentences={textReorder.orderedSentences}
        randomizedSentences={textReorder.randomizedSentences}
      />
    </Layout>
  );
};
