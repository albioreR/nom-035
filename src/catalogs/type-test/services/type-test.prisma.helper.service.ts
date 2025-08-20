import { ConflictException, Injectable } from '@nestjs/common';

import {
  ICatalogsAttributes,
  ITransaction,
  mappingCatalogs,
  PrismaService,
} from '@/config';

import { TTypeTest } from '../interfaces';
import { typeTestMessages } from '../messages';

@Injectable()
export class TypeTestPrismaService {
  constructor(private prismaService: PrismaService) {}

  /**
   * This method has the responsibility to get all type test
   * @returns The `catalog` method returns a Promise that resolves to an array of `ICatalogsAttributes`
   */
  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const typeTest = await (tsx || this.prismaService).typeTest.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingTypeTest = mappingCatalogs<TTypeTest>({
      data: typeTest,
    });

    return mappingTypeTest;
  }

  /**
   * This method has the responsibility to validate if the type test exists
   * @param {number}  - Param to get the type test by id
   */
  async validate(id: number): Promise<void> {
    const typeTest = await this.prismaService.typeTest.findUnique({
      where: {
        id,
      },
    });

    if (!typeTest) {
      throw new ConflictException(typeTestMessages.notFound);
    }
  }
}
