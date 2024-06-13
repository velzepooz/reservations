import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const addExceptionFilter = (app: NestFastifyApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
