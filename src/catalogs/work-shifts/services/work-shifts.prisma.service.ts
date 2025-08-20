import { Injectable } from '@nestjs/common';
import { Prisma, WorkShifts } from '@prisma/client';

import { TFieldsCatalog } from '@/catalogs';
import {
  ICatalogsAttributes,
  ITransaction,
  mappingCatalogs,
  PrismaService,
} from '@/config';

import { TWorkShifts } from '../interfaces';

@Injectable()
export class WorkShiftsPrismaService {
  constructor(private prisma: PrismaService) {}

  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const moduleTypes = await (tsx || this.prisma).workShifts.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingPermissions = mappingCatalogs<TFieldsCatalog<WorkShifts>>({
      data: moduleTypes,
    });

    return mappingPermissions;
  }

  async findMany(): Promise<TWorkShifts[]> {
    const workShifts = await this.prisma.workShifts.findMany({
      select: { id: true, name: true },
    });

    return workShifts;
  }

  async createMany(
    data: Prisma.WorkShiftsCreateManyInput | Prisma.WorkShiftsCreateManyInput[],
    { tsx }: ITransaction,
  ): Promise<TWorkShifts[]> {
    if ((data as Prisma.WorkShiftsCreateManyInput[]).length === 0) return [];

    return await (tsx || this.prisma).workShifts.createManyAndReturn({
      data,
      skipDuplicates: true,
      select: { name: true, id: true },
    });
  }
}
