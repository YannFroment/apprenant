import { DataSource } from 'typeorm';
import { Users } from '../../user/user.service';
import { UserSchema } from '../schemas/user.schema';
import { DATA_SOURCE } from '../database.providers';

const typeORMUsersFactory = (dataSource: DataSource): Users => {
  const baseRepository = dataSource.getRepository(UserSchema);

  return {
    customFind: async () => {
      return baseRepository.find();
    },
    find: async () => {
      return baseRepository.find();
    },
  };
};

export const TypeORMUsers = {
  provide: Users,
  useFactory: typeORMUsersFactory,
  inject: [DATA_SOURCE],
};
