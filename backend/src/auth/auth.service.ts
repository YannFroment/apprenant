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
    const user = (await this.users.findById(id)) as User; // TODO remove type casting
    // TODO should hash refresh token?
    const { access_token, refresh_token } = this.generateAuthTokens(id, email);
    user.refreshToken = refresh_token;
    await this.users.save(user);

    return {
      access_token,
      refresh_token,
    };
  }

  private generateAuthTokens(userId: number, email: string): AuthTokens {
    const payload = { email, sub: userId };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.accessSecret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.refreshSecret,
      }),
    };
  }
}
