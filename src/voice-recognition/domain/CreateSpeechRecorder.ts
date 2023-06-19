export type CreateSpeechRecorder = (
  saveTranscript: (transcript: string) => void,
) => {
  start: () => void;
  stop: () => void;
};
