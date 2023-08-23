import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EncryptionProvider, Users } from '../user/user.service';
import { MockEncryptionProvider } from '../../test/mocks/encryptionProvider';
import { InMemoryUsers, testUser } from '../../test/mocks/users';
import { userMapper } from '../app.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
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
      email: testUser.email,
      plainPassword: 'password',
      expected: userMapper(testUser),
    },
    {
      email: 'wrong@email.com',
      plainPassword: 'password',
      expected: null,
    },
    {
      email: testUser.email,
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
