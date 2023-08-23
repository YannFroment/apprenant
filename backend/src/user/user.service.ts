import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './user';
import { EmailAlreadyInUseError } from './user.errors';

export const Users = 'Users';

export interface Users {
  find: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | null>;
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
    await this.checkEmailUnicityOrFail(createUserDto.email);

    return this.users.create(createUserDto);
  }

  private async checkEmailUnicityOrFail(email: string): Promise<void> {
    const user = await this.users.findByEmail(email);

    if (user) {
      throw new EmailAlreadyInUseError(email);
    }
  }
}
