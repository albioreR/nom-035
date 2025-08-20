import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { PermissionsPrismaService } from './services';

@Module({
  providers: [PermissionsPrismaService],
  exports: [PermissionsPrismaService],
  imports: [PrismaModule],
})
export class PermissionsModule {}
