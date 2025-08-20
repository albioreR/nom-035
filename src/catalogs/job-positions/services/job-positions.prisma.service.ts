import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  ICatalogsAttributes,
  ITransaction,
  mappingCatalogs,
  PrismaService,
} from '@/config';

import { TJobPositionsCatalog } from '../interfaces';

@Injectable()
export class JobPositionsPrismaService {
  constructor(private prisma: PrismaService) {}

  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const moduleTypes = await (tsx || this.prisma).workShifts.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingPermissions = mappingCatalogs<TJobPositionsCatalog>({
      data: moduleTypes,
    });

    return mappingPermissions;
  }

  async findMany(): Promise<TJobPositionsCatalog[]> {
    const jobPositions = await this.prisma.jobPositions.findMany({
      select: { id: true, name: true },
    });

    return jobPositions;
  }

  async createMany(
    data:
      | Prisma.JobPositionsCreateManyInput
      | Prisma.JobPositionsCreateManyInput[],
    { tsx }: ITransaction,
  ): Promise<TJobPositionsCatalog[]> {
    if ((data as Prisma.JobPositionsCreateManyInput[]).length === 0) return [];
    return await (tsx || this.prisma).jobPositions.createManyAndReturn({
      data,
      skipDuplicates: true,
      select: { name: true, id: true },
    });
  }
}
