import VoiceRecorder from './VoiceRecorder';
import { speechSynth } from './external-services/SpeechSynth';
import { voiceRecognition } from './external-services/VoiceRecognition';
import {
  ServiceContainer,
  ServiceContainerContext,
} from './service-container/ServiceContainerContext';

const context: ServiceContainer = {
  voiceRecognition,
  speechSynth,
};

function App() {
  return (
    <ServiceContainerContext.Provider value={context}>
      <VoiceRecorder />
    </ServiceContainerContext.Provider>
  );
}

export default App;
