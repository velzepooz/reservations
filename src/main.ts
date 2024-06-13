import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { addSwagger } from './app/utils/swagger.util';
import { addExceptionFilter } from './app/utils/exception-filter.util';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const config = app.get<ConfigService>(ConfigService);
  addSwagger(app);
  addExceptionFilter(app);

  await app.listen(
    config.get<string>('server.port'),
    config.get<string>('server.host'),
  );
}
bootstrap();
