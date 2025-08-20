import { forwardRef, Module } from '@nestjs/common';

import { RolesModule } from '@/catalogs';
import { PrismaModule } from '@/config';
import { Argon2Module } from '@/providers';

import { EnterprisesModule } from '../enterprises';
import { UserController } from './controllers';
import { UserPrismaService } from './helpers';
import { UserService } from './services';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => RolesModule),
    EnterprisesModule,
    Argon2Module,
  ],
  providers: [UserService, UserPrismaService],
  controllers: [UserController],
  exports: [UserPrismaService],
})
export class UserModule {}
