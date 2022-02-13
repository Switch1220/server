import { Module } from '@nestjs/common';

import { EventsModule } from '@modules/events/events.module';
import { VpnModule } from './modules/vpn/vpn.module';
import { PrismaModule } from './providers/prisma/prisma.module';

@Module({
  imports: [PrismaModule, VpnModule, EventsModule],
})
export class AppModule {}
