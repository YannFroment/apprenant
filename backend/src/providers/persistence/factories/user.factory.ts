import { Bcrypt } from '../../encryption/encryption.module';
import { User } from '../../../user/user';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async () => {
  const user = new User();
  user.firstName = 'John';
  user.lastName = 'Doe';
  user.age = 42;
  user.email = 'john@doe.com';
  user.password = await new Bcrypt().hash('password');

  return user;
});
