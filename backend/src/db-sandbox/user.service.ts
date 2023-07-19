import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';

export const Users = 'Users';

export interface Users {
  find: () => Promise<User[]>;
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
}
