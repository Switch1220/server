import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './adapters/SocketIoAdapter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const port: number = configService.get<number>('port');

  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));
  await app.listen(port);
}
bootstrap();
