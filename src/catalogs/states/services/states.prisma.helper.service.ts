import { Injectable } from '@nestjs/common';

import { ICitiesCatalog, TCitiesCatalog } from '@/catalogs/cities';
import { ITransaction, mappingCatalogs, PrismaService } from '@/config';

import { TStatesCatalog } from '../interfaces';

@Injectable()
export class StatesPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog({ tsx }: ITransaction) {
    const states = await (tsx || this.prismaService).states.findMany({
      select: {
        id: true,
        name: true,
        cities: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const mappingStates = mappingCatalogs<TStatesCatalog & ICitiesCatalog>({
      data: states,
    }).map(({ cities, ...state }) => ({
      ...state,
      cities: mappingCatalogs<TCitiesCatalog>({
        data: cities,
      }),
    }));

    return mappingStates;
  }
}
