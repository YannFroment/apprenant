import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EmailAlreadyInUseError } from './user/user.errors';
import { TokenExpiredError } from './auth/jwt.guard';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status;

    switch (exception.constructor) {
      case EmailAlreadyInUseError:
        status = 409;
        break;
      case UnauthorizedException:
        status = 401;
        break;
      case TokenExpiredError:
        status = 403;
        break;
      default:
        status = 500;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message: exception?.message ?? exception.name,
      path: request.url,
    });
  }
}
