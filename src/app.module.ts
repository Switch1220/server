import { Module } from '@nestjs/common';

import { VpnModule } from './modules/vpn/vpn.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    VpnModule,
  ],
})
export class AppModule {}
