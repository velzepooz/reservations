import { HttpStatus } from '@nestjs/common';
import { ApplicationErrorType } from '../../../utils/application.error';

export const AUTH_ERRORS: { [errorName: string]: ApplicationErrorType } = {
  USERNAME_EXISTS: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Username already exists',
  },
  PASSWORDS_DO_NOT_MATCH: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Confirm password does not match password',
  },
  BAD_CREDENTIALS: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Bad credentials',
  },
};
