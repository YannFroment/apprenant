import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../database.providers';
import { WordRecognitions } from '../../trainings/models/WordRecognitions';
import { WordRecognitionSchema } from '../schemas/wordRecognition.schema';

const typeORMWordRecognitionsFactory = (
  dataSource: DataSource,
): WordRecognitions => {
  const baseRepository = dataSource.getRepository(WordRecognitionSchema);

  return {
    getAll: async () => {
      return baseRepository.find({ relations: { words: true } });
    },
  };
};

export const TypeORMWordRecognitions = {
  provide: WordRecognitions,
  useFactory: typeORMWordRecognitionsFactory,
  inject: [DATA_SOURCE],
};
