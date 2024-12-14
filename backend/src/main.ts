import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DefaultExceptionsFilter } from './infra/filters/default-exception.filter';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DefaultExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
