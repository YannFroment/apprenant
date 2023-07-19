import { DataSource } from 'typeorm';
import { Users } from './user.service';
import { UserSchema } from './user.schema';
import { DATA_SOURCE } from './database.providers';

export const TypeORMUsers = {
  provide: Users,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(UserSchema),
  inject: [DATA_SOURCE],
};
