/* eslint-disable no-undef */
import { Injectable } from '@nestjs/common';

import {
  baseResponse,
  cleanObject,
  getWhereFilter,
  handlerException,
  PrismaService,
} from '@/config';
import { XlsxService } from '@/providers/xlsx';

import { CategoriesEmployeesDto, ImportEmployeesDto } from '../dtos';
import { IEmployeesImport } from '../interfaces';
import { EmployeesHelperService } from './employees.helper.service';
import { EmployeesPrismaService } from './employees.prisma.service';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly employeesPrismaService: EmployeesPrismaService,
    private readonly xlsxService: XlsxService,
    private readonly employeesHelperService: EmployeesHelperService,
    private prisma: PrismaService,
  ) {}

  async findAll({
    like,
    likeField,
    skip,
    take,
    idDepartment = undefined,
    idJobPosition = undefined,
    idWorkShift = undefined,
    idContract,
  }: CategoriesEmployeesDto) {
    try {
      const where = cleanObject({
        ...getWhereFilter({ likeField, like }),
        idDepartment,
        idJobPosition,
        idWorkShift,
        employeesContracts: cleanObject({
          idContract,
        }),
      });

      const data = await this.employeesPrismaService.findAll({
        where,
        skip,
        take,
      });

      return baseResponse({ data });
    } catch (error) {
      return handlerException(error);
    }
  }

  // TODO: El empleado se crea correctamente pero se debe revisar con el equipo como se va a controlar la creación de usuarios para ingresar a la plataforma
  async importData(
    { idContract }: ImportEmployeesDto,
    file: Express.Multer.File,
  ) {
    try {
      const { departments, jobPositions, workShifts } =
        await this.employeesHelperService.getCategoriesToEmployees();

      const xlsxData = this.xlsxService.importFile<IEmployeesImport>(file);

      const dataToBulkCreate =
        await this.employeesHelperService.setFieldsToBulkCreate({
          xlsxArray: xlsxData,
          departments,
          jobPositions,
          workShifts,
        });

      const { bulkCreate, updateMany } =
        await this.employeesPrismaService.findManyByNoEmployee(
          dataToBulkCreate,
        );

      await this.prisma.$transaction(async (tsx) => {
        const newEmployees = await this.employeesPrismaService.createMany(
          bulkCreate,
          { tsx },
        );

        const bulkCreateUserWithContract = newEmployees.map((employee) => ({
          idEmployee: employee.id,
          idContract,
        }));

        await tsx.employeesContracts.createMany({
          data: bulkCreateUserWithContract,
        });

        for (const { id, ...data } of updateMany) {
          await this.employeesPrismaService.update(
            { data, where: { id } },
            { tsx },
          );
        }
      });

      return baseResponse({ data: dataToBulkCreate });
    } catch (error) {
      return handlerException(error);
    }
  }
}
