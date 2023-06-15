import { speechSynth } from './external-services/SpeechSynth';
import { voiceRecognition } from './external-services/VoiceRecognition';
import {
  VoiceRecognitionContext,
  VoiceRecognitionServiceContainer,
} from './service-container/ServiceContainerContext';
import { VoiceRecognition } from './VoiceRecognition';

const context: VoiceRecognitionServiceContainer = {
  voiceRecognition,
  speechSynth,
};

export const VoiceRecognitionTraining = () => {
  return (
    <VoiceRecognitionContext.Provider value={context}>
      <VoiceRecognition words={['voiture', 'bus', 'train']} />
    </VoiceRecognitionContext.Provider>
  );
};
