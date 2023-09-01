import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';
import { TextReorder } from '../../../trainings/models/TextReorder';

export const TextReorderSchema = new EntitySchema<TextReorder>({
  name: 'TextReorder',
  target: TextReorder,
  columns: {
    ...BaseColumnSchemaPart,
    title: {
      type: String,
      nullable: false,
    },
    orderedSentences: {
      type: 'json',
      name: 'ordered_sentences',
      nullable: false,
    },
    randomizedSentences: {
      type: 'json',
      name: 'randomized_sentences',
      nullable: false,
    },
  },
});
