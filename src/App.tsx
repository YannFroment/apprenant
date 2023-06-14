import VoiceRecorder from './VoiceRecorder';
import {
  ServiceContainer,
  ServiceContainerContext,
} from './service-container/ServiceContainerContext';

const context: ServiceContainer = {
  voiceRecognition: {
    recognize: () => {
      // this is the production implementation!
    },
  },
};

function App() {
  return (
    <ServiceContainerContext.Provider value={context}>
      <VoiceRecorder />
    </ServiceContainerContext.Provider>
  );
}

export default App;
