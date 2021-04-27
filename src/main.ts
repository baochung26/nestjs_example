import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.APP_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: process.env.FRONTEND_URL });
  }

  const port = process.env.APP_PORT;
  await app.listen(port);
}
bootstrap();
