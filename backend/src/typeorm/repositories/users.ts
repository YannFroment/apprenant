import { DataSource } from 'typeorm';
import { Users } from '../../user/user.service';
import { UserSchema } from '../schemas/user.schema';
import { DATA_SOURCE } from '../database.providers';

export const TypeORMUsers = {
  provide: Users,
  useFactory: (dataSource: DataSource): Users =>
    dataSource.getRepository(UserSchema),
  inject: [DATA_SOURCE],
};
