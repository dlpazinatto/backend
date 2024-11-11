import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CreateFirstUserSeed } from './seeders/create-first-user.seed';
import { NotFoundFilter } from './filters/not-found.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization',
  });
  const createFirstUserService = app.get(CreateFirstUserSeed);
  await createFirstUserService.run();

  const config = new DocumentBuilder()
    .setTitle('API Books')
    .setDescription('Crud for Books')
    .setVersion('1.0')
    .addTag('books')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  app.useGlobalFilters(new NotFoundFilter());

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
