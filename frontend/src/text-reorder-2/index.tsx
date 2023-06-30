import { Layout } from '../pages/layouts/Layout';
import { useAppContext } from '../service-container/ServiceContainerContext';

export const TextReorder2 = () => {
  //   const { id } = useParams();
  //   const { textReorders } = useTrainingsStore();

  //   const textReorder = textReorders.find((el) => el.id.toString() === id);

  const { useCurrentTextReorder } = useAppContext();

  const textReorder = useCurrentTextReorder();
  console.info('textReorder', textReorder);

  //   if (!textReorder) {
  //     return <Navigate to="/" />;
  //   }

  return (
    <Layout>
      <p>{textReorder?.id}</p>
      <div>{textReorder?.title}</div>
    </Layout>
  );
};
