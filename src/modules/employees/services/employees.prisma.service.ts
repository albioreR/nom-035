import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  getArrayFromProperty,
  IPrismaOptions,
  IPrismaUpdate,
  ITransaction,
  PrismaService,
} from '@/config';

import { IEmployeesFindAll, TEmployeesFindAll } from '../interfaces';

@Injectable()
export class EmployeesPrismaService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(
    options: IPrismaOptions<Prisma.EmployeesWhereInput>,
  ): Promise<IEmployeesFindAll[]> {
    return this.prismaService.employees.findMany({
      ...options,
      select: {
        id: true,
        birthDate: true,
        firstName: true,
        secondName: true,
        cellphone: true,
        lastName: true,
        email: true,
        cp: true,
        motherLastName: true,
        street: true,
        idDepartment: true,
        noEmployee: true,
        idJobPosition: true,
        idWorkShift: true,
        users: { select: { id: true, name: true, lastname: true } },
      },
    });
  }

  async findManyByNoEmployee(
    dataToBulkCreate: Omit<TEmployeesFindAll, 'id'>[],
  ) {
    const noEmployees = getArrayFromProperty<Omit<TEmployeesFindAll, 'id'>>(
      dataToBulkCreate,
      'noEmployee',
    );

    const employees = await this.prismaService.employees.findMany({
      where: {
        noEmployee: { in: noEmployees as string[] },
      },
      select: {
        id: true,
        noEmployee: true,
      },
    });

    const bulkCreate: Omit<TEmployeesFindAll, 'id'>[] = [];

    const updateMany: TEmployeesFindAll[] = [];

    dataToBulkCreate.forEach(({ noEmployee, ...rest }) => {
      const employeeFind = employees.find(
        (employee) => employee.noEmployee === noEmployee,
      );

      if (employeeFind) {
        return updateMany.push({ ...rest, noEmployee, id: employeeFind.id });
      }

      return bulkCreate.push({ ...rest, noEmployee });
    });

    return {
      bulkCreate,
      updateMany,
    };
  }

  createMany(data: Prisma.EmployeesCreateManyInput[], { tsx }: ITransaction) {
    return (tsx || this.prismaService).employees.createManyAndReturn({
      data,
      skipDuplicates: true,
    });
  }

  update(
    {
      data,
      where,
    }: IPrismaUpdate<
      Prisma.EmployeesWhereUniqueInput,
      Prisma.XOR<
        Prisma.EmployeesUpdateInput,
        Prisma.EmployeesUncheckedUpdateInput
      >
    >,
    { tsx }: ITransaction,
  ) {
    return (tsx || this.prismaService).employees.update({ data, where });
  }
}
