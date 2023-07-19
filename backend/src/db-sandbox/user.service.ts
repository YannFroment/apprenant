import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';

export const UserRepository = 'UserRepository';

export interface UserRepository {
  find: () => Promise<User[]>;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
