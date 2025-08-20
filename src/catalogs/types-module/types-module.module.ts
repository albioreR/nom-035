import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { TypesModulePrismaService } from './services';

@Module({
  providers: [TypesModulePrismaService],
  exports: [TypesModulePrismaService],
  imports: [PrismaModule],
})
export class TypesModuleModule {}
