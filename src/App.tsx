import { TextReorder } from './text-reorder';
import { VoiceRecognition } from './voice-recognition';

function App() {
  return (
    <>
      <TextReorder
        orderedSentences={['Phrase 1', 'Phrase 2', 'Phrase 3']}
        randomizedSentences={['Phrase 3', 'Phrase 1', 'Phrase 2']}
      />
      <VoiceRecognition />
    </>
  );
}

export default App;
