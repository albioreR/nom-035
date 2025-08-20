/* eslint-disable no-undef */
import { Injectable } from '@nestjs/common';

import { TypeTestPrismaService } from '@/catalogs';
import {
  baseResponse,
  FindAllDto,
  getWhereFilter,
  handlerException,
  IdDto,
} from '@/config';
import { EnterprisesPrismaService } from '@/modules/enterprises';

import { FirebaseService } from '../../../providers/firebase/services/firebase.service';
import { CreateContractsDto } from '../dtos';
import { ContractsPrismaService } from './contracts.prisma.service';

@Injectable()
export class ContractsService {
  constructor(
    private readonly enterprisePrismaService: EnterprisesPrismaService,
    private readonly contractsPrismaService: ContractsPrismaService,
    private readonly firebaseService: FirebaseService,
    private readonly typeTestPrismaService: TypeTestPrismaService,
  ) {}

  /**
   * This method has the responsibility to create a contract with validation like the enterprise and the type test and upload
   * the contract to firebase
   * @param {CreateContractsDto}  - Properties to create a contract
   * @param {Express.Multer.File}  - File to upload
   * @returns The `create` method return a success message or throw if the method had an error
   */
  async create(
    {
      idEnterprise,
      title,
      endDate,
      startDate,
      idTypeTest,
      ...createContractsDto
    }: CreateContractsDto,
    contract: Express.Multer.File,
  ) {
    try {
      await this.typeTestPrismaService.validate(idTypeTest);

      const enterprise =
        await this.enterprisePrismaService.validate(idEnterprise);

      const url = await this.firebaseService.uploadImages({
        logo: contract,
        path: `enterprises/${enterprise.businessName}/contracts/${startDate}/${title}`,
      });

      await this.contractsPrismaService.create({
        ...createContractsDto,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        title,
        url,
        idTypeTest,
      });

      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * this method has the responsibility to find all contracts by enterprise and set a pagination
   * @param {IdEnterpriseFindAllDto}  - Properties to find all contracts by enterprise
   * @returns A base response with the contracts found
   */
  async findAll({ like, likeField, take, skip }: FindAllDto) {
    try {
      const where = { ...getWhereFilter({ likeField, like }) };

      const contracts = await this.contractsPrismaService.findMany({
        where,
        skip,
        take,
      });

      return baseResponse({
        data: contracts,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * This method has the responsibility to find a contract by id and remove it
   * @param {IdDto} - Generic Dto with prop [id] to get the contract
   * @returns A base response with the contract removed
   */
  async remove({ id }: IdDto) {
    try {
      await this.contractsPrismaService.findAndValidate(id);

      await this.contractsPrismaService.remove(id);

      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * This method has the responsibility to find a contract by id and update it, remove contract when the contract is null
   * the registar has an url and upload the new contract to firebase if the contract is not null
   * @param {CreateContractsDto} - Properties to update a contract
   * @param {Express.Multer.File} - File to upload
   * @returns The `update` method return a success message or throw if the method had an error
   */
  async update(
    { id, idEnterprise, ...updateContractsDto }: CreateContractsDto & IdDto,
    contract: Express.Multer.File,
  ): Promise<void> {
    try {
      const contractInfo =
        await this.contractsPrismaService.findAndValidate(id);

      const enterprise =
        await this.enterprisePrismaService.validate(idEnterprise);

      if (contractInfo.url || contract === null) {
        await this.firebaseService.deleteImage({
          path: contractInfo.url,
        });
      }

      let url;

      if (contract) {
        url = await this.firebaseService.uploadImages({
          logo: contract,
          path: `enterprises/${enterprise.businessName}/contracts/${contractInfo.startDate}/${contractInfo.title}`,
        });
      }

      await this.contractsPrismaService.update({
        data: { ...updateContractsDto, url },
        where: { id },
      });
    } catch (error) {
      return handlerException(error);
    }
  }
}
