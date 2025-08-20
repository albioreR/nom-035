import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  IPrismaOptions,
  IPrismaUpdate,
  PrismaService,
  whereActive,
} from '@/config';

import { ICreateContractsDto, IGetOne } from '../interfaces';
import { contractsMessages } from '../messages';

@Injectable()
export class ContractsPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(createContractsDto: ICreateContractsDto): Promise<void> {
    await this.prisma.contracts.create({
      data: createContractsDto,
    });
  }

  async findMany(
    options: IPrismaOptions<Prisma.ContractsWhereInput>,
  ): Promise<ICreateContractsDto[]> {
    return await this.prisma.contracts.findMany(options);
  }

  async findAndValidate(id: number): Promise<IGetOne> {
    const contract = await this.prisma.contracts.findUnique({ where: { id } });

    if (!contract) {
      throw new ConflictException(contractsMessages.notFound);
    }

    return contract;
  }

  async update({
    data,
    where,
  }: IPrismaUpdate<
    Prisma.ContractsWhereUniqueInput,
    Prisma.XOR<
      Prisma.ContractsUpdateInput,
      Prisma.ContractsUncheckedUpdateInput
    >
  >) {
    await this.prisma.contracts.update({
      data,
      where: {
        ...where,
        ...whereActive,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.contracts.update({
      data: { active: false },
      where: { id, ...whereActive },
    });
  }
}
