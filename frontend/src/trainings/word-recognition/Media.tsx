import { Listen } from './Listen';
import { Picture } from './Picture';
import { SpeechRecorder } from './SpeechRecorder';

type MediaProps = {
  word: string;
};

export const Media = ({ word }: MediaProps) => {
  return (
    <div data-testid={word}>
      <Picture word={word} />
      <p>{word}</p>
      <Listen word={word} />
      <SpeechRecorder text={word} />
    </div>
  );
};
