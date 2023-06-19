import { pexelPictures } from './external-services/Pictures';
import { createWindowSpeechRecorder } from './external-services/CreateSpeechRecorder';
import { speechSynth } from './external-services/SpeechSynth';
import {
  VoiceRecognitionContext,
  VoiceRecognitionServiceContainer,
} from './service-container/ServiceContainerContext';
import { VoiceRecognition } from './VoiceRecognition';

const context: VoiceRecognitionServiceContainer = {
  speechSynth,
  createSpeechRecorder: createWindowSpeechRecorder,
  pictures: pexelPictures,
};

export const VoiceRecognitionTraining = () => {
  return (
    <VoiceRecognitionContext.Provider value={context}>
      <VoiceRecognition words={['voiture', 'bus', 'camion']} />
    </VoiceRecognitionContext.Provider>
  );
};
