import { User } from './user.entity';
import { UserRepository, UsersService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';

const user: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
};

class InMemoryUserRepository implements UserRepository {
  async find(): Promise<User[]> {
    return [user];
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useClass: InMemoryUserRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });
  it('should return all users', async () => {
    const users = await usersService.findAll();

    expect(users).toEqual(expect.arrayContaining([user]));
  });
});
