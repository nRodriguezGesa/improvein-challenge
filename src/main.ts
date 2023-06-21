import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { CinematographyModule } from './features/cinematography.module';

async function bootstrap() {
  const port = 3000;
  const globalPrefix = 'improvein-challenge';
  const baseUrl = 'http://localhost:3000/';
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cinematography')
    .setDescription('Improvein Challenge')
    .setVersion('1.0')
    .addTag('Cinematography')
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer <JWT>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const app = await NestFactory.create(CinematographyModule, {
    logger: ['error', 'log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(globalPrefix);
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  app.use(helmet());
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDocument);
  await app.listen(port);
  Logger.log(`Listen to port: ${port}`, 'App');
  Logger.log(`Docs: ${baseUrl}${globalPrefix}/docs`, 'App');
}
bootstrap();
