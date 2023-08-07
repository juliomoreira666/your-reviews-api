import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  momentTimezone.tz.setDefault('America/Sao_Paulo');
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
