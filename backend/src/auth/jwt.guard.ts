import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class TokenExpiredError extends Error {
  constructor() {
    super('Token expired');
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info?.name === 'TokenExpiredError') {
      throw new TokenExpiredError();
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
