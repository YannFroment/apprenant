export type Recorder = (saveTranscript: (transcript: string) => void) => {
  start: () => void;
  stop: () => void;
};
