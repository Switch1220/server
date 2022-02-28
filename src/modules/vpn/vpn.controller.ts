import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, Vpn as VpnModel } from '@prisma/client';
import { VpnService } from './vpn.service';
import { CreateVpnDto } from './dto/create-vpn.dto';
import { registerConnectionDto } from './dto/register-connection.dto';
import { registerDisconnectionDto } from './dto/register-disconnection.dto';

@Controller()
export class VpnController {
  private readonly vpnService: VpnService;

  constructor(vpnService: VpnService) {
    this.vpnService = vpnService;
  }

  @Get('ping')
  async ping() {
    return 'pong';
  }

  @Get('vpn')
  async getAvailableVpn() {
    console.log('ping1');
    return await this.vpnService.getVpn({ isAvailable: true });
  }

  @Get('vpns')
  async getVpns(): Promise<VpnModel[]> {
    return await this.vpnService.getVpns({
      orderBy: { isAvailable: 'asc' },
      // where: { isAvailable: true },
    });
  }

  @Get('vpn/:id')
  async getVpn(@Param('id') id: string): Promise<VpnModel> {
    return await this.vpnService.getVpn({ id: String(id) });
  }

  @Post('vpn')
  async createVpn(@Body() vpnData: CreateVpnDto): Promise<VpnModel> {
    try {
      return await this.vpnService.createVpn(vpnData);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new BadRequestException(e);
      }
    }
  }

  // -TODO: Status, edit for POST req; dto, error handling

  @Patch('vpn/connect')
  async registerConnection(
    @Body() statusData: registerConnectionDto,
  ): Promise<VpnModel> {
    const { id, userInfo } = statusData;
    return await this.vpnService.updateVpn({
      where: { id: String(id) },
      data: { isAvailable: false, userInfo: String(userInfo) },
    });
  }

  @Patch('vpn/disconnect')
  async registerDisconnection(
    @Body() statusData: registerDisconnectionDto,
  ): Promise<VpnModel> {
    const { id } = statusData;
    return await this.vpnService.updateVpn({
      where: { id: String(id) },
      data: { isAvailable: true, userInfo: null },
    });
  }
}
