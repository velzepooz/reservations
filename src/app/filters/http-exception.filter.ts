import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as { message: string[] };

    response.status(status).send({
      statusCode: status,
      message: Array.isArray(errorResponse.message)
        ? errorResponse.message
        : [errorResponse.message],
    });
  }
}
