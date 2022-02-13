import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Vpn as VpnModel } from '@prisma/client';
import { VpnService } from './vpn.service';
import { CreateVpnDto } from './dto/create-vpn.dto';

@Controller('vpn')
export class VpnController {
  private readonly vpnService: VpnService;

  constructor(vpnService: VpnService) {
    this.vpnService = vpnService;
  }

  @Get(':id')
  async getVpn(@Param('id') id: string): Promise<VpnModel> {
    return this.vpnService.getVpn({ id: Number(id) });
  }

  @Get()
  async getVpns(): Promise<VpnModel[]> {
    return this.vpnService.getVpns({
      where: { isAvailable: true },
    });
  }

  @Post()
  async createVpn(@Body() vpnData: CreateVpnDto): Promise<VpnModel> {
    return this.vpnService.createVpn(vpnData);
  }

  @Patch(':id')
  updateVpn(@Param('id') id: number) {
    return this.vpnService.updateVpn({
      where: { id: Number(id) },
      data: { isAvailable: true },
    });
  }
}
