import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage(client: Socket, payload: string): void {
    const t: string = 'test';
    client.emit('events');
    this.server.emit('events', payload);
  }
}
