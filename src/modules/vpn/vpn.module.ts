import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { VpnController } from './vpn.controller';
import { VpnService } from './vpn.service';
import { VpnGateway } from './vpn.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [VpnController],
  providers: [VpnService, VpnGateway],
})
export class VpnModule {}
