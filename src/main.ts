import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './adapters/SocketIoAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port: number = configService.get<number>('port');

  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

  await app.listen(port);
}
bootstrap();
