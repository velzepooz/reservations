import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const addSwagger = (app: NestFastifyApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Reservations API')
    .setDescription('REST API for reservations')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
