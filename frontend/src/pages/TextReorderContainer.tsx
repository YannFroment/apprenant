import { Navigate, useParams } from 'react-router-dom';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { TextReorder } from '../text-reorder';
import { Layout } from '../views/layouts/Layout';

const useCurrentTextReorder = (id: string | undefined) => {
  const { useStore } = useAppContext();
  const { textReorders } = useStore();

  return textReorders.find((textReorder) => textReorder.id.toString() === id);
};

export const TextReorderContainer = () => {
  const { id } = useParams();
  const textReorder = useCurrentTextReorder(id);

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
