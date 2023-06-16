import { Word } from './Word';

type VoiceRecognitionProps = {
  words?: string[];
  defaultIsRecording?: boolean;
};

export const VoiceRecognition = (
  { words }: VoiceRecognitionProps = { words: [] },
) => {
  return (
    <div>
      {words?.map((word) => (
        <Word key={word} word={word} />
      ))}
    </div>
  );
};
