import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../database.providers';
import { TextReorders } from '../../trainings/models/TextReorders';
import { TextReorderSchema } from '../schemas/textReorder.schema';
import {
  CreateTextReorderDTO,
  TextReorder,
} from '../../trainings/models/TextReorder';

const typeORMTextReordersFactory = (dataSource: DataSource): TextReorders => {
  const baseRepository = dataSource.getRepository(TextReorderSchema);

  return {
    getAll: async () => {
      return baseRepository.find();
    },
    create: async (
      createTextReorderDTO: CreateTextReorderDTO,
    ): Promise<TextReorder> => {
      return baseRepository.save(createTextReorderDTO);
    },
  };
};

export const TypeORMTextReorders = {
  provide: TextReorders,
  useFactory: typeORMTextReordersFactory,
  inject: [DATA_SOURCE],
};
