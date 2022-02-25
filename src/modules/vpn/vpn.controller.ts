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
import { UpdateVpnDto } from './dto/update-vpn.dto';

@Controller()
export class VpnController {
  private readonly vpnService: VpnService;

  constructor(vpnService: VpnService) {
    this.vpnService = vpnService;
  }

  @Get('vpn')
  async getAvailableVpn() {
    return await this.vpnService.getVpns({
      orderBy: { isAvailable: 'desc' },
      where: { isAvailable: true },
    });
  }

  @Get('vpns')
  async getVpns(): Promise<VpnModel[]> {
    return await this.vpnService.getVpns({
      orderBy: { isAvailable: 'desc' },
      // where: { isAvailable: true },
    });
  }

  @Get('vpn/:id')
  async getVpn(@Param('id') id: string): Promise<VpnModel> {
    return await this.vpnService.getVpn({ id: String(id) });
  }

  @Post()
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

  @Patch()
  async updateVpn(@Body() statusData: UpdateVpnDto): Promise<VpnModel> {
    const { id, isAvailable, userInfo } = statusData;
    return await this.vpnService.updateVpn({
      where: { id: String(id) },
      data: { isAvailable: Boolean(isAvailable), userInfo: String(userInfo) },
    });
  }
}
