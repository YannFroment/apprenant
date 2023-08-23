import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto, User } from '../user/user';
import { EncryptionProvider, Users } from '../user/user.service';

// TODO remove duplication of user, inmemoryusers and mockencryptionprovider
const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
  age: 42,
  email: 'email@email.com',
  password: 'hashed_password',
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
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }
}

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: Users, useClass: InMemoryUsers },
        { provide: EncryptionProvider, useClass: MockEncryptionProvider },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it.each([
    {
      email: user.email,
      plainPassword: 'password',
      expected: user,
    },
    {
      email: 'wrong@email.com',
      plainPassword: 'password',
      expected: null,
    },
    {
      email: user.email,
      plainPassword: 'wrong_password',
      expected: null,
    },
  ])(
    'should validate the user against email and password',
    async ({ email, plainPassword, expected }) => {
      const foundUser = await authService.validateUser(email, plainPassword);

      expect(foundUser).toEqual(expected);
    },
  );
});
