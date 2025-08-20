import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';

import {
  CatalogsModule,
  ModulesModule,
  PermissionsModule,
  RolesModule,
  StatesModule,
  TypesModuleModule,
  TypeTestModule,
} from './catalogs';
import { joiValidate, PaginationInterceptor } from './config';
import { ContractsModule, EnterprisesModule, UserModule } from './modules';
import { AuthModule, FirebaseModule, NodemailerModule } from './providers';
import { DepartmentsModule } from './catalogs/departments/departments.module';
import { JobPositionsModule } from './catalogs/job-positions/job-positions.module';
import { SectionsModule } from './catalogs/sections/sections.module';
import { WorkShiftsModule } from './catalogs/work-shifts/work-shifts.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { XlsxModule } from './providers/xlsx/xlsx.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: joiValidate,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    AuthModule,
    UserModule,
    RolesModule,
    ModulesModule,
    PermissionsModule,
    TypeTestModule,
    TypesModuleModule,
    StatesModule,
    CatalogsModule,
    NodemailerModule,
    EnterprisesModule,
    FirebaseModule,
    ContractsModule,
    SectionsModule,
    DepartmentsModule,
    JobPositionsModule,
    WorkShiftsModule,
    EmployeesModule,
    XlsxModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PaginationInterceptor,
    },
  ],
})
export class AppModule {}
