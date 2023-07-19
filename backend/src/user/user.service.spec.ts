import { User } from './user';
import { Users, UsersService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
};

export class InMemoryUsers implements Users {
  async find(): Promise<User[]> {
    return [user];
  }

  async create(): Promise<User> {
    throw Error('Not yet implemented');
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
});
