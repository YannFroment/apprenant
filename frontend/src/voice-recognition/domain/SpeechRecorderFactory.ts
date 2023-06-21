export type SpeechRecorderFactory = (
  saveTranscript: (transcript: string) => void,
) => {
  start: () => void;
  stop: () => void;
};
