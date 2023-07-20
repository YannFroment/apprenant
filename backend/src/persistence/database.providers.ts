import { appDataSource } from './datasource';

export const DATA_SOURCE = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return appDataSource.initialize();
    },
  },
];
