import { ConflictException, Injectable } from '@nestjs/common';
import { Enterprises, Prisma } from '@prisma/client';

import {
  IPrismaOptions,
  IPrismaUpdate,
  ITransaction,
  PrismaService,
} from '@/config';

import { enterpriseMessages } from '../messages';

@Injectable()
export class EnterprisesPrismaService {
  constructor(private prisma: PrismaService) {}

  async findMany(
    { skip, take, where }: IPrismaOptions<Prisma.EnterprisesWhereInput>,
    { tsx }: ITransaction,
  ): Promise<Enterprises[]> {
    return await (tsx ?? this.prisma).enterprises.findMany({
      skip,
      take,
      where,
    });
  }

  async create(
    data: Prisma.EnterprisesUncheckedCreateInput,
  ): Promise<Enterprises> {
    return await this.prisma.enterprises.create({
      data,
    });
  }

  async update({
    data,
    where,
  }: IPrismaUpdate<
    Prisma.EnterprisesWhereUniqueInput,
    Prisma.XOR<
      Prisma.EnterprisesUpdateInput,
      Prisma.EnterprisesUncheckedUpdateInput
    >
  >): Promise<Enterprises> {
    return await this.prisma.enterprises.update({
      data,
      where,
    });
  }

  async validate(id: number): Promise<Enterprises> {
    const enterprise = await this.prisma.enterprises.findUnique({
      where: {
        id,
        active: true,
      },
    });

    if (!enterprise) {
      throw new ConflictException(enterpriseMessages.notFound);
    }

    return enterprise;
  }
}
