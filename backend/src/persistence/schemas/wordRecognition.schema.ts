import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';
import { WordRecognition, Word } from '../../trainings/models/WordRecognition';

export const WordRecognitionSchema = new EntitySchema<WordRecognition>({
  name: 'WordRecognition',
  target: WordRecognition,
  columns: {
    ...BaseColumnSchemaPart,
    title: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    words: {
      type: 'one-to-many',
      target: 'Word',
      cascade: true,
    },
  },
});

export const WordSchema = new EntitySchema<Word>({
  name: 'Word',
  target: Word,
  columns: {
    ...BaseColumnSchemaPart,
    word: {
      type: String,
      nullable: false,
    },
    url: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    wordRecognition: {
      type: 'many-to-one',
      target: 'WordRecognition',
      onDelete: 'CASCADE',
    },
  },
});
