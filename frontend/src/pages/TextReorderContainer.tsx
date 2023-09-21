import { Navigate, useParams } from 'react-router-dom';

import { useTrainingsStore } from '../store';
import { TextReorder } from '../trainings/text-reorder';
import { Layout } from '../views/layouts/Layout';

const useTextReorderById = (id: string | undefined) => {
  const { textReorders } = useTrainingsStore();

  return textReorders.find((textReorder) => textReorder.id.toString() === id);
};

export const TextReorderContainer = (initialStoreValue?) => {
  const { id } = useParams();
  //   const textReorder = useTextReorderById(id);
  const { getTextReorderById } = useTrainingsStore(initialStoreValue);
  const textReorder = getTextReorderById(id);

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
