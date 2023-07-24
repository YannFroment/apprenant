import { DataSource } from 'typeorm';
import { Users } from '../../user/user.service';
import { UserSchema } from '../schemas/user.schema';
import { DATA_SOURCE } from '../database.providers';
import { CreateUserDto, User } from 'src/user/user';

const typeORMUsersFactory = (dataSource: DataSource): Users => {
  const baseRepository = dataSource.getRepository(UserSchema);

  return {
    find: async () => {
      return baseRepository.find();
    },
    create: async (createUserDto: CreateUserDto): Promise<User> => {
      return baseRepository.save(createUserDto);
    },
  };
};

export const TypeORMUsers = {
  provide: Users,
  useFactory: typeORMUsersFactory,
  inject: [DATA_SOURCE],
};
