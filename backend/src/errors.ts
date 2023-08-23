import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { EmailAlreadyInUseError } from './user/user.errors';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = 500;

    switch (exception.constructor) {
      case EmailAlreadyInUseError:
        status = 409;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.name,
      path: request.url,
    });
  }
}
