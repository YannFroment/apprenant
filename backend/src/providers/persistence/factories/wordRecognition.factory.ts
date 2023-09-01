import {
  Word,
  WordRecognition,
} from '../../../trainings/models/WordRecognition';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(WordRecognition, () => {
  const wordRecognition = new WordRecognition();
  const word = new Word();
  word.url =
    'https://images.pexels.com/photos/16038653/pexels-photo-16038653.jpeg?auto=compress&cs=tinysrgb&h=350';
  word.label = 'voiture';
  word.wordRecognition = wordRecognition;
  wordRecognition.title = 'Les transports';
  wordRecognition.words = [word];

  return wordRecognition;
});
