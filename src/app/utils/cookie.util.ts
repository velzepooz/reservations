import { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

export const addCookie = async (app: NestFastifyApplication): Promise<void> => {
  await app.register(fastifyCookie);
};
