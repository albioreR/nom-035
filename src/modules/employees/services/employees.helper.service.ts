import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  DepartmentsPrismaService,
  JobPositionsPrismaService,
  TDepartmentsCatalog,
  TJobPositionsCatalog,
  TWorkShifts,
  WorkShiftsPrismaService,
} from '@/catalogs';
import { PrismaService } from '@/config';
import { convertExcelDate, formatToDate } from '@/config/common';

import {
  IEmployeesAttributesNoFormat,
  IEmployeesImport,
  ISetFieldToBulkCreate,
  IXlsxArray,
  TEmployeesFindAll,
} from '../interfaces';

@Injectable()
export class EmployeesHelperService {
  constructor(
    private readonly departmentPrismaService: DepartmentsPrismaService,
    private readonly workShiftPrismaService: WorkShiftsPrismaService,
    private readonly jobPositionPrismaService: JobPositionsPrismaService,
    private readonly prisma: PrismaService,
  ) {}

  restructureXlsxArray(
    xlsxArray: IEmployeesImport[],
  ): IEmployeesAttributesNoFormat[] {
    return xlsxArray.map((xlsxObject: IEmployeesImport) => ({
      birthDate: convertExcelDate(xlsxObject.Cumpleaños),
      firstName: xlsxObject['Primer Nombre'],
      secondName: xlsxObject['Segundo Nombre'],
      cellphone: String(xlsxObject.Celular),
      lastName: xlsxObject['Apellido Paterno'],
      email: xlsxObject.Correo,
      cp: String(xlsxObject['Código Postal']),
      motherLastName: xlsxObject['Apellido Materno'],
      street: xlsxObject.Domicilio,
      department: xlsxObject.Departamento,
      workShift: xlsxObject.Turno,
      jobPosition: xlsxObject.Puesto,
      noEmployee: String(xlsxObject['# Empleado']),
    }));
  }

  loopToFindCategoriesEmployees(
    formatData: IEmployeesAttributesNoFormat[],
    {
      departments,
      jobPositions,
      workShifts,
      findId = false,
    }: ISetFieldToBulkCreate,
  ) {
    const bulkDepartments:
      | Prisma.DepartmentsCreateManyInput
      | Prisma.DepartmentsCreateManyInput[] = [];

    const bulkJobPositions:
      | Prisma.JobPositionsCreateManyInput
      | Prisma.JobPositionsCreateManyInput[] = [];

    const bulkWorkShifts:
      | Prisma.WorkShiftsCreateManyInput
      | Prisma.WorkShiftsCreateManyInput[] = [];

    const formatEmployees: Omit<TEmployeesFindAll, 'id'>[] = [];

    formatData.forEach(({ department, jobPosition, workShift, ...rest }) => {
      const departmentFind = departments.find(
        ({ name }: TDepartmentsCatalog) =>
          name.toLowerCase() === department.toLowerCase(),
      );

      if (!departmentFind && !findId) {
        bulkDepartments.push({ name: department });
      }

      const jobPositionFind = jobPositions.find(
        ({ name }: TJobPositionsCatalog) =>
          name.toLowerCase() === jobPosition.toLowerCase(),
      );

      if (!jobPositionFind && !findId) {
        bulkJobPositions.push({ name: jobPosition });
      }

      const workShiftFind = workShifts.find(
        ({ name }: TWorkShifts) =>
          name.toLowerCase() === workShift.toLowerCase(),
      );

      if (!workShiftFind && !findId) {
        bulkWorkShifts.push({ name: workShift });
      }

      if (findId)
        formatEmployees.push({
          ...rest,
          birthDate: formatToDate(rest.birthDate),
          idDepartment: departmentFind.id,
          idJobPosition: jobPositionFind.id,
          idWorkShift: workShiftFind.id,
        });
    });

    return {
      bulkDepartments,
      bulkJobPositions,
      bulkWorkShifts,
      formatEmployees,
    };
  }

  async setFieldsToBulkCreate({
    xlsxArray,
    departments,
    jobPositions,
    workShifts,
  }: ISetFieldToBulkCreate & IXlsxArray) {
    const formatData: IEmployeesAttributesNoFormat[] =
      this.restructureXlsxArray(xlsxArray);

    const { bulkDepartments, bulkJobPositions, bulkWorkShifts } =
      this.loopToFindCategoriesEmployees(formatData, {
        departments,
        jobPositions,
        workShifts,
      });

    await this.prisma.$transaction(async (tsx): Promise<null> => {
      departments.push(
        ...((await this.departmentPrismaService.createMany(bulkDepartments, {
          tsx,
        })) as TDepartmentsCatalog[]),
      );

      jobPositions.push(
        ...((await this.jobPositionPrismaService.createMany(bulkJobPositions, {
          tsx,
        })) as TJobPositionsCatalog[]),
      );

      workShifts.push(
        ...((await this.workShiftPrismaService.createMany(bulkWorkShifts, {
          tsx,
        })) as TWorkShifts[]),
      );

      return null;
    });

    const { formatEmployees } = this.loopToFindCategoriesEmployees(formatData, {
      departments,
      jobPositions,
      workShifts,
      findId: true,
    });

    return formatEmployees;
  }

  async getCategoriesToEmployees() {
    const departmentsCatalog = this.departmentPrismaService.findMany();

    const workShiftsCatalog = this.workShiftPrismaService.findMany();

    const jobPositionsCatalog = this.jobPositionPrismaService.findMany();

    const [departments, workShifts, jobPositions] = await Promise.all([
      departmentsCatalog,
      workShiftsCatalog,
      jobPositionsCatalog,
    ]);

    return {
      departments,
      workShifts,
      jobPositions,
    };
  }
}
