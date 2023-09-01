import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

export type RefreshTokenUser = {
  userId: number;
  refreshToken: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.refreshSecret,
      passReqToCallback: true,
    });
  }

  validate(
    req: Request,
    payload: { sub: string; email: string },
  ): RefreshTokenUser {
    const refreshToken = req
      .get('Authorization')
      ?.replace('Bearer', '')
      .trim() as string;

    return { userId: parseInt(payload.sub, 10), refreshToken };
  }
}
