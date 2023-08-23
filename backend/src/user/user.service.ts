import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './user';
import { EmailAlreadyInUseError } from './user.errors';

export const Users = 'Users';

export interface Users {
  find: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | null>;
  create: (createUserDto: CreateUserDto) => Promise<User>;
}

export const EncryptionProvider = 'EncryptionProvider';

export interface EncryptionProvider {
  hash: (textToHash: string) => Promise<string>;
  compare: (plainPassword: string, hashedPassword: string) => Promise<boolean>;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(Users)
    private users: Users,
    @Inject(EncryptionProvider)
    private encryptionProvider: EncryptionProvider,
  ) {}

  async findAll(): Promise<User[]> {
    return this.users.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkEmailUnicityOrFail(createUserDto.email);
    createUserDto.password = await this.encryptionProvider.hash(
      createUserDto.password,
    );

    return this.users.create(createUserDto);
  }

  private async checkEmailUnicityOrFail(email: string): Promise<void> {
    const user = await this.users.findByEmail(email);

    if (user) {
      throw new EmailAlreadyInUseError(email);
    }
  }
}
