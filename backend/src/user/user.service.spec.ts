import { EmailAlreadyInUseError } from './user.errors';
import { Users, UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MockEncryptionProvider } from '../../test/mocks/encryptionProvider';
import { InMemoryUsers, testUser } from '../../test/mocks/users';
import { EncryptionProvider } from '../providers/encryption/encryption.module';

describe('UsersService', () => {
  let usersService: UserService;
  let inMemoryUsers: Users;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: Users, useClass: InMemoryUsers },
        { provide: EncryptionProvider, useClass: MockEncryptionProvider },
      ],
    }).compile();

    usersService = module.get<UserService>(UserService);
    inMemoryUsers = module.get<Users>(Users);
  });

  it('should return all users', async () => {
    const users = await usersService.findAll();

    expect(users).toEqual(expect.arrayContaining([testUser]));
  });

  describe('create', () => {
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
        password: 'hashed_plain_password',
      });
    });

    it('should not create a user if a user already exists with the same email', async () => {
      expect(async () => {
        await usersService.create({
          firstName: 'Jane',
          lastName: 'Doe',
          email: testUser.email,
          password: 'plain_password',
        });
      }).rejects.toThrow(new EmailAlreadyInUseError(testUser.email));
    });
  });
});
