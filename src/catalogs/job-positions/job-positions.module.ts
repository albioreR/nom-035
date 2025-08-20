import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { JobPositionsPrismaService } from './services';

@Module({
  providers: [JobPositionsPrismaService],
  exports: [JobPositionsPrismaService],
  imports: [PrismaModule],
})
export class JobPositionsModule {}
