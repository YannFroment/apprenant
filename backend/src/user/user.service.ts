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
    return this.users.create(createUserDto);
  }
}
