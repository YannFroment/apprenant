import { Link } from 'react-router-dom';

export const Exercices = () => {
  return (
    <div>
      <Link to="/text-reorder" relative="path">
        text-reorder
      </Link>
      <br />
      <Link to="/voice-recognition" relative="path">
        voice-recognition
      </Link>
    </div>
  );
};
