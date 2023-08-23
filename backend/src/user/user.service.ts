import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './user';

export const Users = 'Users';

export interface Users {
  find: () => Promise<User[]>;
  create: (createUserDto: CreateUserDto) => Promise<User>;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(Users)
    private users: Users,
  ) {}

  async findAll(): Promise<User[]> {
    return this.users.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUsers = await this.users.find();
    const userWithEmail = existingUsers.find(
      (user) => user.email === createUserDto.email,
    );

    if (userWithEmail) {
      throw Error('User with given email already exists');
    }
    return this.users.create(createUserDto);
  }
}
