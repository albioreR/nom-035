import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { TypeTestPrismaService } from './services';

@Module({
  imports: [PrismaModule],
  providers: [TypeTestPrismaService],
  exports: [TypeTestPrismaService],
})
export class TypeTestModule {}
