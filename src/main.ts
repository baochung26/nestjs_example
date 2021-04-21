import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  console.log('process.env.NODE_ENV');
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors( {origin: serverConfig.fontendurl})
  }
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
