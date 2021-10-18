import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { config } from 'dotenv';
import * as constants from './common/constants/constants';
import { AppModule } from './app.module';

config({ path: `.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(morgan('dev'));

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>(constants.CAR_RENT_BE_PORT, 8080);

  await app.listen(port);
}

bootstrap();
