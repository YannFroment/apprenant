import { Link } from 'react-router-dom';
import { Layout } from './layouts/Layout';

export const Exercices = () => {
  return (
    <Layout>
      <Link to="/text-reorder" relative="path">
        text-reorder
      </Link>
      <br />
      <Link to="/voice-recognition" relative="path">
        voice-recognition
      </Link>
    </Layout>
  );
};
