import { CreateUserDto, User } from './user';
import { Users, UsersService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
  age: 42,
};

export class InMemoryUsers implements Users {
  data: User[] = [user];

  async find(): Promise<User[]> {
    return this.data;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return createUserDto as User;
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
    await usersService.create({
      firstName: 'Jane',
      lastName: 'Doe',
    });

    expect(spyOnCreate).toHaveBeenCalledWith({
      firstName: 'Jane',
      lastName: 'Doe',
    });
  });
});
