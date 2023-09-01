import { DataSource } from 'typeorm';
import { Users } from '../../../user/user.service';
import { UserSchema } from '../schemas/user.schema';
import { DATA_SOURCE } from '../database.providers';
import { CreateUserDto, User } from 'src/user/user';

const typeORMUsersFactory = (dataSource: DataSource): Users => {
  const baseRepository = dataSource.getRepository(UserSchema);

  return {
    find: async () => {
      return baseRepository.find();
    },
    create: async (createUserDto: CreateUserDto): Promise<User> => {
      return baseRepository.save(createUserDto);
    },
    findByEmail: async (email: string): Promise<User | null> => {
      return baseRepository.findOne({
        where: {
          email,
        },
      });
    },
    findById: async (id: number): Promise<User | null> => {
      if (id === undefined) {
        return null;
      }

      const user = await baseRepository.findOneBy({
        id,
      });

      return user;
    },
    save: async (user: User): Promise<User> => {
      return baseRepository.save(user);
    },
  };
};

export const TypeORMUsers = {
  provide: Users,
  useFactory: typeORMUsersFactory,
  inject: [DATA_SOURCE],
};
