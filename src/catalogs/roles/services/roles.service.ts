import { Injectable } from '@nestjs/common';

import { baseResponse, FindAllDto, handlerException, IdDto } from '@/config';

import { getWhereFilter } from '../../../config/common/utils/find-all.util';
import { CreateRoleDto, UpdateRoleDto } from '../dto';
import { RolesPrismaService } from '../services';

@Injectable()
export class RolesService {
  constructor(private readonly rolesPrismaService: RolesPrismaService) {}

  async create({ name, description }: CreateRoleDto) {
    try {
      await this.rolesPrismaService.validateDuplicateRole(name);

      await this.rolesPrismaService.createRole({
        name,
        description,
      });
      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }

  async findAllRoles({ like, likeField, skip, take }: FindAllDto) {
    try {
      const where = getWhereFilter({ likeField, like });
      const data = await this.rolesPrismaService.findAllRole({
        skip,
        take,
        where,
      });
      return baseResponse({ data });
    } catch (error) {
      return handlerException(error);
    }
  }

  async updateRole({ id, ...rest }: UpdateRoleDto) {
    try {
      await this.rolesPrismaService.findByIdRole(id);
      await this.rolesPrismaService.updateRole({ id, ...rest });
      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }

  async deleteRole({ id }: IdDto) {
    try {
      await this.rolesPrismaService.findByIdRole(id);
      await this.rolesPrismaService.deleteRole(id);
      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }
}
