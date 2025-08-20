import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { ModulesPrismaService } from './services';

@Module({
  providers: [ModulesPrismaService],
  exports: [ModulesPrismaService],
  imports: [PrismaModule],
})
export class ModulesModule {}
