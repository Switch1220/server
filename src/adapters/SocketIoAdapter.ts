import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  create(
    port: number,
    options?: ServerOptions & { namespace?: string; server?: any },
  ) {
    const eventPort: number = this.configService.get<number>('eventPort');
    const eventOptions: Object = this.configService.get<Object>('eventOptions');

    port = eventPort;
    // assign
    options = { ...options, ...eventOptions };

    return super.create(port, options);
  }
}
