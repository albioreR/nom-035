import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { StatesPrismaService } from './services';

@Module({
  providers: [StatesPrismaService],
  exports: [StatesPrismaService],
  imports: [PrismaModule],
})
export class StatesModule {}
