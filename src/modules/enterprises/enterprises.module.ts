import { Module } from '@nestjs/common';

import { CitiesModule } from '@/catalogs';
import { PrismaModule } from '@/config';
import { FirebaseModule } from '@/providers/firebase';

import { EnterprisesController } from './controllers';
import { EnterprisesService } from './services';
import { EnterprisesPrismaService } from './helpers/enterprises.prisma.helper.service';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService, EnterprisesPrismaService],
  imports: [PrismaModule, CitiesModule, FirebaseModule],
  exports: [EnterprisesPrismaService],
})
export class EnterprisesModule {}
