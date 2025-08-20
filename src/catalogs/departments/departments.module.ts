import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { DepartmentsPrismaService } from './services';

@Module({
  providers: [DepartmentsPrismaService],
  exports: [DepartmentsPrismaService],
  imports: [PrismaModule],
})
export class DepartmentsModule {}
