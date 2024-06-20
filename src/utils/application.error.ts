import { HttpException } from '@nestjs/common';

export type ApplicationErrorType = {
  statusCode: number;
  message: string;
};

export class ApplicationError extends HttpException {
  constructor(error: ApplicationErrorType) {
    super(error.message, error.statusCode);
  }
}
