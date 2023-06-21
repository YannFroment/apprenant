import { SpeechRecorder } from './SpeechRecorder';
import { Listen } from './Listen';
import { Picture } from './Picture';

type WordProps = {
  word: string;
};

export const Word = ({ word }: WordProps) => {
  return (
    <div data-testid={word}>
      <Picture word={word} />
      <p>{word}</p>
      <Listen word={word} />
      <SpeechRecorder text={word} />
    </div>
  );
};
