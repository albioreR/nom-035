import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, Roles } from '@prisma/client';

import {
  ICatalogsAttributes,
  IPrismaOptions,
  ITransaction,
  mappingCatalogs,
  PrismaService,
  TOmitFieldsControl,
} from '@/config';

import { UpdateRoleDto } from '../dto';
import { CreateRoleDto } from '../dto/create-roles.dto';
import { TRolesNotPropControls } from '../interfaces';
import { roleMessages } from '../messages';

@Injectable()
export class RolesPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog({ tsx }: ITransaction): Promise<ICatalogsAttributes[]> {
    const roles = await (tsx || this.prismaService).roles.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingRoles = mappingCatalogs<TRolesNotPropControls>({
      data: roles,
    });

    return mappingRoles;
  }

  async findByIdRole(id: number): Promise<TOmitFieldsControl<Roles> | void> {
    const role = await this.prismaService.roles.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new ConflictException(roleMessages.roleNotFound);
    }

    return role;
  }

  async validateDuplicateRole(name: string): Promise<void> {
    const roles = await this.prismaService.roles.findFirst({
      where: {
        name,
      },
    });
    if (roles) {
      throw new ConflictException(roleMessages.roleDuplicate);
    }
  }

  async createRole(data: CreateRoleDto): Promise<TOmitFieldsControl<Roles>> {
    const role = await this.prismaService.roles.create({ data });
    return role;
  }

  async findAllRole({
    skip,
    take,
    where,
  }: IPrismaOptions<Prisma.RolesWhereInput>): Promise<
    TOmitFieldsControl<Roles>[]
  > {
    const role = await this.prismaService.roles.findMany({
      skip,
      take,
      where,
    });
    return role;
  }

  async updateRole(
    data: UpdateRoleDto,
  ): Promise<Prisma.Prisma__RolesClient<TOmitFieldsControl<Roles>>> {
    const role = await this.prismaService.roles.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    return role;
  }

  async deleteRole(id: number): Promise<void> {
    await this.prismaService.roles.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    await this.prismaService.rolesModules.updateMany({
      where: {
        idRole: id,
      },
      data: {
        active: false,
      },
    });

    await this.prismaService.users.updateMany({
      where: {
        idRole: id,
      },
      data: {
        idRole: null,
      },
    });
  }
}
