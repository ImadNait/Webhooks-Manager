import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  const port = process.env.NEST_PORT
  if(typeof port == 'number')
  await app.listen(port);
}

bootstrap();
