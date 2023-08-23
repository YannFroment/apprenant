import { EntitySchema } from 'typeorm';
import { User } from '../../../user/user';
import { BaseColumnSchemaPart } from './base.schema';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    ...BaseColumnSchemaPart,
    firstName: {
      type: String,
      name: 'first_name',
      nullable: false,
    },
    lastName: {
      type: String,
      name: 'last_name',
      nullable: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      name: 'is_active',
    },
    age: {
      type: Number,
      default: 42,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
  },
});
