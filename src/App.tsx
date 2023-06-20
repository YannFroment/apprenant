import { TextReorderTraining } from './text-reorder';
import { VoiceRecognitionTraining } from './voice-recognition';

function App() {
  return (
    <>
      <TextReorderTraining
        orderedSentences={['Phrase 1', 'Phrase 2', 'Phrase 3']}
        randomizedSentences={['Phrase 3', 'Phrase 1', 'Phrase 2']}
      />
      <VoiceRecognitionTraining />
    </>
  );
}

export default App;
