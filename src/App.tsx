import { TextReorderTraining } from './text-reorder';
import { VoiceRecognitionTraining } from './voice-recognition';

function App() {
  return (
    <>
      <TextReorderTraining sentences={['Phrase 3', 'Phrase 1', 'Phrase 2']} />
      <VoiceRecognitionTraining />
    </>
  );
}

export default App;
