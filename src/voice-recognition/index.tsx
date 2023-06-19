import { pexelPictures } from './external-services/Pictures';
import { windowSpeechRecorderFactory } from './external-services/WindowSpeechRecorderFactory';
import { windowSpeechSynth } from './external-services/SpeechSynth';
import {
  VoiceRecognitionContext,
  VoiceRecognitionServiceContainer,
} from './service-container/ServiceContainerContext';
import { WordsContainer } from './WordsContainer';

const context: VoiceRecognitionServiceContainer = {
  speechSynth: windowSpeechSynth,
  speechRecorderFactory: windowSpeechRecorderFactory,
  pictures: pexelPictures,
};

export const VoiceRecognitionTraining = () => {
  return (
    <VoiceRecognitionContext.Provider value={context}>
      <WordsContainer words={['voiture', 'bus', 'camion']} />
    </VoiceRecognitionContext.Provider>
  );
};
