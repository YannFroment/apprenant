import { Inject, Injectable } from '@nestjs/common';
import { EncryptionProvider, Users } from '../user/user.service';
import { UserWithoutPassword, userMapper } from '../app.controller';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from '../user/user';

type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject(Users)
    private users: Users,
    @Inject(EncryptionProvider)
    private encryptionProvider: EncryptionProvider,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.users.findByEmail(email);

    if (
      user &&
      (await this.encryptionProvider.compare(plainPassword, user.password))
    ) {
      return userMapper(user);
    }

    return null;
  }

  async login({ id, email }: UserWithoutPassword): Promise<AuthTokens> {
    const payload = { email, sub: id };

    const user = (await this.users.findById(id)) as User; // TODO remove type casting
    // TODO should hash refresh token?
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.accessSecret,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
    });
    user.refreshToken = refreshToken;
    await this.users.save(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
