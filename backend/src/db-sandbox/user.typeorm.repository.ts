import { DataSource } from 'typeorm';
import { UserRepository } from './user.service';
import { UserSchema } from './user.schema';
import { DATA_SOURCE } from './database.providers';

export const TypeORMUserRepository = {
  provide: UserRepository,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UserSchema),
  inject: [DATA_SOURCE],
};
