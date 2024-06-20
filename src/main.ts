import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { addSwagger } from './app/utils/swagger.util';
import { addExceptionFilter } from './app/utils/exception-filter.util';
import { addMultipart } from './app/utils/multipart.util';
import { addCookie } from './app/utils/cookie.util';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const config = app.get<ConfigService>(ConfigService);
  addSwagger(app);
  addExceptionFilter(app);
  await addMultipart(app);
  await addCookie(app);

  await app.listen(
    config.get<string>('server.port'),
    config.get<string>('server.host'),
  );
}
bootstrap();
