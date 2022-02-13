import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma/prisma.module';
import { VpnController } from './vpn.controller';
import { VpnService } from './vpn.service';

@Module({
  imports: [PrismaModule],
  controllers: [VpnController],
  providers: [VpnService],
})
export class VpnModule {}
