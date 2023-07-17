import { Navigate, useParams } from 'react-router-dom';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { TextReorder } from '../text-reorder';
import { Layout } from '../views/layouts/Layout';

const useCurrentTextReorder = () => {
  const { id } = useParams();
  const { useStore } = useAppContext();
  const { textReorders } = useStore();

  return textReorders.find((el) => el.id.toString() === id);
};

export const TextReorderContainer = () => {
  const textReorder = useCurrentTextReorder();

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
