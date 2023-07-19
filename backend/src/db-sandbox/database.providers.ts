import { DataSource } from 'typeorm';
import { UserSchema } from './user.schema';

export const DATA_SOURCE = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'database',
        port: 3306,
        username: 'apprenant',
        password: 'apprenant',
        database: 'apprenant',
        entities: [UserSchema],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
