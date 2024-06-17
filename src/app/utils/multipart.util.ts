import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-file-interceptor';

export const addMultipart = async (
  app: NestFastifyApplication,
): Promise<void> => {
  await app.register(contentParser);
};
