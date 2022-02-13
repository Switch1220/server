import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  private readonly configService: ConfigService;

  constructor(app: INestApplicationContext, configService: ConfigService) {
    super(app);
    this.configService = configService;
  }

  create(
    port: number,
    options?: ServerOptions & { namespace?: string; server?: any },
  ) {
    const eventPort: number = this.configService.get<number>('eventPort');
    const eventOptions: object = this.configService.get<object>('eventOptions');

    port = eventPort;
    // assign
    options = { ...options, ...eventOptions };

    return super.create(port, options);
  }
}
