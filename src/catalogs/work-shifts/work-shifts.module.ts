import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { WorkShiftsPrismaService } from './services';

@Module({
  providers: [WorkShiftsPrismaService],
  exports: [WorkShiftsPrismaService],
  imports: [PrismaModule],
})
export class WorkShiftsModule {}
