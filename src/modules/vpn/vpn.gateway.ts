import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Vpn as VpnModel } from '@prisma/client';

@WebSocketGateway({ cors: true })
export class VpnGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getVpn')
  handleMessage(client: Socket, payload: unknown): void {
    this.server.emit('events', payload);
  }

  @SubscribeMessage('vpn-req')
  async handleVpnReq(client: Socket, payload?: unknown): Promise<void> {
    const vpns = await this.getAllVpns();
    this.server.emit('vpn-res', vpns);
  }

  @SubscribeMessage('connect-req')
  async handleConnectReq(client: Socket, payload?: unknown) {
    const vpn = await this.prisma.vpn.findFirst({
      where: { isAvailable: true },
    });

    client.emit('connect-res', vpn);
  }

  @SubscribeMessage('confirm-req')
  async handleConfirmReq(
    client: Socket,
    payload: { id: string; userInfo: string },
  ) {
    const update = await this.prisma.vpn.update({
      where: {
        id: payload.id,
      },
      data: {
        isAvailable: false,
        userInfo: payload.userInfo || payload.id,
      },
    });

    const updatedVpns = await this.getAllVpns();
    this.server.emit('vpn-res', updatedVpns);
  }

  @SubscribeMessage('disconnect-req')
  async handleDisconnectionNotice(client: Socket, payload) {
    // const update = await this.prisma.vpn.update({
    //   where: {
    //     id: payload,
    //   },
    //   data: {
    //     isAvailable: true,
    //     userInfo: null,
    //   },
    // });
    // client.emit('disconnect-res', update);
    // const updatedVpns = await this.getAllVpns();
    // this.server.emit('vpn-res', updatedVpns);
    // client.broadcast.emit('update');
    // // 업데이트 로직 분리예정
  }

  async getAllVpns(): Promise<VpnModel[]> {
    const vpns = await this.prisma.vpn.findMany();
    return vpns;
  }

  afterInit(server: Server) {
    console.log('init');
  }

  handleConnection(client: Socket, args) {
    client.emit('update');
    console.log(`client "${client.id}" connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client "${client.id}" disconnected`);
  }
}
