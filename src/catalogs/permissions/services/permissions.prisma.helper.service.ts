import { Injectable } from '@nestjs/common';

import {
  ICatalogsAttributes,
  ITransaction,
  mappingCatalogs,
  PrismaService,
} from '@/config';

import { TPermissionsNotPropControls } from '../interfaces';

@Injectable()
export class PermissionsPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const permissions = await (tsx || this.prismaService).permissions.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingPermissions = mappingCatalogs<TPermissionsNotPropControls>({
      data: permissions,
    });

    return mappingPermissions;
  }
}
