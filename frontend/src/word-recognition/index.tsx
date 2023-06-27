import { Layout } from '../pages/layouts/Layout';
import { pexelPictures } from './external-services/Pictures';
import { windowSpeechSynth } from './external-services/SpeechSynth';
import { windowSpeechRecorderFactory } from './external-services/WindowSpeechRecorderFactory';
import {
  WordRecognitionContext,
  WordRecognitionServiceContainer,
} from './service-container/ServiceContainerContext';
import { WordsContainer } from './WordsContainer';

const context: WordRecognitionServiceContainer = {
  speechSynth: windowSpeechSynth,
  speechRecorderFactory: windowSpeechRecorderFactory,
  pictures: pexelPictures,
};

export const WordRecognition = () => {
  return (
    <Layout>
      <WordRecognitionContext.Provider value={context}>
        <WordsContainer words={['voiture', 'bus', 'camion']} />
      </WordRecognitionContext.Provider>
    </Layout>
  );
};
