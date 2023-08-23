import { User } from '../../user/user';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, () => {
  const user = new User();
  user.firstName = 'John';
  user.lastName = 'Doe';
  user.age = 42;
  user.email = 'john@doe.com';

  return user;
});
