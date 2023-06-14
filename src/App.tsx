import VoiceRecorder from './VoiceRecorder';
import { speechSynth } from './external-services/SpeechSynth';
import {
  ServiceContainer,
  ServiceContainerContext,
} from './service-container/ServiceContainerContext';

const context: ServiceContainer = {
  voiceRecognition: {
    recognize: () => {
      // this is the production implementation!
      return false;
    },
  },
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
