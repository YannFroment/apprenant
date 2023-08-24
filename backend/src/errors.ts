import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EmailAlreadyInUseError } from './user/user.errors';

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
      default:
        status = 500;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.name,
      path: request.url,
    });
  }
}
