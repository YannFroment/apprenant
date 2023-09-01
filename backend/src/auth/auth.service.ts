import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.users.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { access_token, refresh_token } = this.generateAuthTokens(id, email);
    await this.updateRefreshToken(user, refresh_token);

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAuthTokens(userId: number, refreshToken: string) {
    const user = await this.users.findById(userId);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    const refreshTokenMatches = refreshToken === user.refreshToken;

    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }

    const tokens = this.generateAuthTokens(user.id, user.email);
    await this.updateRefreshToken(user, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<void> {
    const user = await this.users.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    user.refreshToken = null;

    this.users.save(user);
  }

  private async updateRefreshToken(user: User, refreshToken: string) {
    user.refreshToken = refreshToken;

    await this.users.save(user);
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
