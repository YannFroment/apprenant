import { EntitySchema } from 'typeorm';
import { User } from '../../user/user';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
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
  },
});
