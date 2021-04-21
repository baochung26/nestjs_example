import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as dotenv from 'dotenv';

// config environment variable
dotenv.config();

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  if (process.env.APP_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.fontendurl });
  }
  const port = process.env.APP_PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
