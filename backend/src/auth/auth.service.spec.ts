import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EncryptionProvider, Users } from '../user/user.service';
import { MockEncryptionProvider } from '../../test/mocks/encryptionProvider';
import { InMemoryUsers, testUser } from '../../test/mocks/users';
import { userMapper } from '../app.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let authService: AuthService;
  let spyOnJwtSign: jest.SpyInstance;
  let spyOnUsersSave: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
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
    const users = module.get<Users>(Users);
    spyOnUsersSave = jest.spyOn(users, 'save');
    const jwtService = module.get<JwtService>(JwtService);
    spyOnJwtSign = jest.spyOn(jwtService, 'sign');
  });
  describe('validateUser', () => {
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

  describe('login', () => {
    it('should return auth tokens', async () => {
      const { access_token, refresh_token } = await authService.login(testUser);

      expect(spyOnJwtSign).toHaveBeenNthCalledWith(
        1,
        { email: testUser.email, sub: testUser.id },
        expect.objectContaining({ secret: jwtConstants.accessSecret }),
      );
      expect(spyOnJwtSign).toHaveBeenNthCalledWith(
        2,
        { email: testUser.email, sub: testUser.id },
        expect.objectContaining({ secret: jwtConstants.refreshSecret }),
      );
      expect(access_token).toBeDefined();
      expect(access_token).toBeTruthy();
      expect(refresh_token).toBeDefined();
      expect(refresh_token).toBeTruthy();
    });

    it('should persist refresh token', async () => {
      const { refresh_token } = await authService.login(testUser);
      expect(spyOnUsersSave).toHaveBeenCalledWith(
        expect.objectContaining({ refreshToken: refresh_token }),
      );
    });
  });
});
