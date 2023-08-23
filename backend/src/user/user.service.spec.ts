import { CreateUserDto, User } from './user';
import { Users, UsersService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
  age: 42,
  email: 'email@email.com',
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

describe('UsersService', () => {
  let usersService: UsersService;
  let inMemoryUsers: Users;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: Users, useClass: InMemoryUsers }],
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
    };
    await usersService.create(newUser);

    expect(spyOnCreate).toHaveBeenCalledWith(newUser);
  });

  it('should not create a user if a user already exists with the same email', async () => {
    expect(async () => {
      await usersService.create({
        firstName: 'Jane',
        lastName: 'Doe',
        email: user.email,
      });
    }).rejects.toThrow('User with given email already exists');
  });
});
