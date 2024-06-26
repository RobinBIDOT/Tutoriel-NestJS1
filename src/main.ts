import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from 'path';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session';
import * as mySqlSession from "express-mysql-session"
import { localData } from "./middlewares/localsData"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');
  app.useGlobalPipes(new ValidationPipe())
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setViewEngine("ejs")

  const options = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'blog'
  };
  const MySQLStore = mySqlSession(session)
  const store = new MySQLStore(options)
  // somewhere in your initialization file
  app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        store: store,
      }),
  );

  app.use(localData)
  await app.listen(3000);
  logger.log('Application is running on: ' + await app.getUrl());
}
bootstrap();
