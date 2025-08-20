import { Injectable } from '@nestjs/common';

import {
  ICatalogsAttributes,
  ITransaction,
  mappingCatalogs,
  PrismaService,
} from '@/config';

import { TModulesNotPropControls } from '../interfaces';

@Injectable()
export class ModulesPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const modules = await (tsx || this.prismaService).modules.findMany({
      select: {
        id: true,
        name: true,
        component: true,
        description: true,
        icon: true,
        route: true,
        idType: true,
        menuOption: true,
      },
    });

    const mappingModules = mappingCatalogs<TModulesNotPropControls>({
      data: modules,
    });

    return mappingModules;
  }
}
