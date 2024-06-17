import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const addExceptionFilter = (app: NestFastifyApplication): void => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
