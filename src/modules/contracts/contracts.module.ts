import { Module } from '@nestjs/common';

import { TypeTestModule } from '@/catalogs';
import { PrismaModule } from '@/config';
import { AuthModule } from '@/providers';
import { FirebaseModule } from '@/providers/firebase';

import { EnterprisesModule } from '../enterprises';
import { ContractsController } from './controllers';
import { ContractsPrismaService, ContractsService } from './services/';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EnterprisesModule,
    TypeTestModule,
    FirebaseModule,
  ],
  providers: [ContractsService, ContractsPrismaService],
  controllers: [ContractsController],
})
export class ContractsModule {}
