import { Word } from '../../domain/Trainings';
import { Listen } from './Listen';
import { Picture } from './Picture';
import { SpeechRecorder } from './SpeechRecorder';

type MediaProps = {
  word: Word;
};

export const Media = ({ word }: MediaProps) => {
  return (
    <div data-testid={word.label}>
      <Picture word={word.label} />
      <p>{word.label}</p>
      <Listen word={word.label} />
      <SpeechRecorder text={word.label} />
    </div>
  );
};
