import { Injectable } from '@nestjs/common';
import { Prisma, Vpn } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class VpnService {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async getVpn(
    vpnWhereUniqueInput: Prisma.VpnWhereUniqueInput,
  ): Promise<Vpn | null> {
    return this.prisma.vpn.findUnique({
      where: vpnWhereUniqueInput,
    });
  }

  async getVpns(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VpnWhereUniqueInput;
    where?: Prisma.VpnWhereInput;
    orderBy?: Prisma.VpnOrderByWithRelationInput;
  }): Promise<Vpn[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.vpn.findMany({ skip, take, cursor, where, orderBy });
  }

  async createVpn(data: Prisma.VpnCreateInput): Promise<Vpn> {
    return this.prisma.vpn.create({
      data,
    });
  }

  async updateVpn(params: {
    where: Prisma.VpnWhereUniqueInput;
    data: Prisma.VpnUpdateInput;
  }): Promise<Vpn> {
    const { where, data } = params;
    return this.prisma.vpn.update({
      where,
      data,
    });
  }

  async deleteVpn(where: Prisma.VpnWhereUniqueInput): Promise<Vpn> {
    return this.prisma.vpn.delete({
      where,
    });
  }
}
