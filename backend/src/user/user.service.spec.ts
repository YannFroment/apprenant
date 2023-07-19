import { User } from './user';
import { Users, UsersService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
};

class InMemoryUsers implements Users {
  async find(): Promise<User[]> {
    return [user];
  }

  async customFind(): Promise<User[]> {
    return [user];
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: Users, useClass: InMemoryUsers }],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    const users = await usersService.findAll();

    expect(users).toEqual(expect.arrayContaining([user]));
  });

  it('should use custom repo method', async () => {
    const users = await usersService.findAllWithCustomMethod();

    expect(users).toEqual(expect.arrayContaining([user]));
  });
});
