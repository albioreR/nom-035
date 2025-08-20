import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { RolesController } from './controllers';
import { RolesPrismaService } from './services';
import { RolesService } from './services/roles.service';

@Module({
  providers: [RolesPrismaService, RolesService],
  controllers: [RolesController],
  exports: [RolesPrismaService],
  imports: [PrismaModule],
})
export class RolesModule {}
