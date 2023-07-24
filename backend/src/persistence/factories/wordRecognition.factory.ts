import { Word, WordRecognition } from '../../trainings/models/WordRecognition';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(WordRecognition, () => {
  const wordRecognition = new WordRecognition();
  const word = new Word();
  word.url = 'voiture.jpg';
  word.word = 'voiture';
  word.wordRecognition = wordRecognition;
  wordRecognition.title = 'Les transports';
  wordRecognition.words = [word];

  return wordRecognition;
});
