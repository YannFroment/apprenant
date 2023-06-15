import { speechSynth } from './voice-recognition/external-services/SpeechSynth';
import { voiceRecognition } from './voice-recognition/external-services/VoiceRecognition';

import {
  VoiceRecognitionServiceContainer,
  VoiceRecognitionContext,
} from './voice-recognition/service-container/ServiceContainerContext';

import { VoiceRecognition } from './voice-recognition/VoiceRecognition';

const context: VoiceRecognitionServiceContainer = {
  voiceRecognition,
  speechSynth,
};

function App() {
  return (
    <VoiceRecognitionContext.Provider value={context}>
      <VoiceRecognition words={['voiture', 'bus', 'train']} />
    </VoiceRecognitionContext.Provider>
  );
}

export default App;
