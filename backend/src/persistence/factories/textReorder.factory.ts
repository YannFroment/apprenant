import { TextReorder } from '../../trainings/models/TextReorder';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(TextReorder, () => {
  const user = new TextReorder();
  user.title = 'Article du Monde';
  user.orderedSentences = ['Hello.', 'World.'];
  user.randomizedSentences = ['World.', 'Hello.'];

  return user;
});
