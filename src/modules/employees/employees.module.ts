import { Module } from '@nestjs/common';

import {
  DepartmentsModule,
  JobPositionsModule,
  WorkShiftsModule,
} from '@/catalogs';
import { PrismaModule } from '@/config';
import { XlsxModule } from '@/providers/xlsx';

import { EmployeesController } from './controllers';
import {
  EmployeesHelperService,
  EmployeesPrismaService,
  EmployeesService,
} from './services';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesPrismaService, EmployeesHelperService],
  imports: [
    PrismaModule,
    XlsxModule,
    DepartmentsModule,
    WorkShiftsModule,
    JobPositionsModule,
  ],
})
export class EmployeesModule {}
