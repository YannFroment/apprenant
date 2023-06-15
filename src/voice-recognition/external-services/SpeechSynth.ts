import { SpeechSynth } from '../../domain/SpeechSynth';

export const speechSynth: SpeechSynth = {
  speak: (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  },
};
