import { CreateUserDto, User } from './user';
import { EmailAlreadyInUseError } from './user.errors';
import { EncryptionProvider, Users, UsersService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
  age: 42,
  email: 'email@email.com',
  password: 'password',
};

export class InMemoryUsers implements Users {
  data: User[] = [user];

  async find(): Promise<User[]> {
    return this.data;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return createUserDto as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.data.find((user) => user.email === email) ?? null;
  }
}

export class MockEncryptionProvider implements EncryptionProvider {
  static HASHED_PASSWORD = 'hashed_password';

  async hash(): Promise<string> {
    return MockEncryptionProvider.HASHED_PASSWORD;
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  let inMemoryUsers: Users;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Users, useClass: InMemoryUsers },
        { provide: EncryptionProvider, useClass: MockEncryptionProvider },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    inMemoryUsers = module.get<Users>(Users);
  });

  it('should return all users', async () => {
    const users = await usersService.findAll();

    expect(users).toEqual(expect.arrayContaining([user]));
  });

  it('should create a user', async () => {
    const spyOnCreate = jest.spyOn(inMemoryUsers, 'create');
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@doe.com',
      password: 'password',
    };
    await usersService.create(newUser);

    expect(spyOnCreate).toHaveBeenCalledWith(
      expect.objectContaining({ email: newUser.email }),
    );
  });

  it('should hash the user password', async () => {
    const spyOnCreate = jest.spyOn(inMemoryUsers, 'create');
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@doe.com',
      password: 'plain_password',
    };
    await usersService.create(newUser);

    expect(spyOnCreate).toHaveBeenCalledWith({
      ...newUser,
      password: MockEncryptionProvider.HASHED_PASSWORD,
    });
  });

  it('should not create a user if a user already exists with the same email', async () => {
    expect(async () => {
      await usersService.create({
        firstName: 'Jane',
        lastName: 'Doe',
        email: user.email,
        password: 'plain_password',
      });
    }).rejects.toThrow(new EmailAlreadyInUseError(user.email));
  });
});
