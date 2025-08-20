import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';
import { EnterprisesModule } from '@/modules';

import { DepartmentsModule } from '../departments';
import { JobPositionsModule } from '../job-positions';
import { ModulesModule } from '../modules';
import { PermissionsModule } from '../permissions';
import { RolesModule } from '../roles';
import { SectionsModule } from '../sections';
import { StatesModule } from '../states';
import { TypeTestModule } from '../type-test';
import { TypesModuleModule } from '../types-module';
import { WorkShiftsModule } from '../work-shifts';
import { CatalogsController } from './controllers';
import { CatalogsService } from './services';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService],
  imports: [
    ModulesModule,
    PermissionsModule,
    RolesModule,
    StatesModule,
    TypeTestModule,
    TypesModuleModule,
    SectionsModule,
    DepartmentsModule,
    JobPositionsModule,
    WorkShiftsModule,
    PrismaModule,
    EnterprisesModule,
  ],
})
export class CatalogsModule {}
