import { NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';

export const addHelmet = async (app: NestFastifyApplication): Promise<void> => {
  await app.register(helmet);
};
