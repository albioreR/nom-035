import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  ICatalogsAttributes,
  ITransaction,
  mappingCatalogs,
  PrismaService,
} from '@/config';

import { TDepartmentsCatalog } from '../interfaces';

@Injectable()
export class DepartmentsPrismaService {
  constructor(private prisma: PrismaService) {}

  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const moduleTypes = await (tsx || this.prisma).workShifts.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingPermissions = mappingCatalogs<TDepartmentsCatalog>({
      data: moduleTypes,
    });

    return mappingPermissions;
  }

  async findMany(): Promise<TDepartmentsCatalog[]> {
    const departments = await this.prisma.departments.findMany({
      select: { id: true, name: true },
    });

    return departments;
  }

  async createMany(
    data:
      | Prisma.DepartmentsCreateManyInput
      | Prisma.DepartmentsCreateManyInput[],
    { tsx }: ITransaction,
  ): Promise<TDepartmentsCatalog[]> {
    if ((data as Prisma.DepartmentsCreateManyInput[]).length === 0) return [];

    return await (tsx || this.prisma).departments.createManyAndReturn({
      data,
      skipDuplicates: true,
      select: { name: true, id: true },
    });
  }
}
