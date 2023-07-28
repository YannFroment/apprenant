import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/schemas/*.schema{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/*.seeder{.ts,.js}'],
  factories: [__dirname + '/factories/*.factory{.ts,.js}'],
};

export const appDataSource = new DataSource(options);
