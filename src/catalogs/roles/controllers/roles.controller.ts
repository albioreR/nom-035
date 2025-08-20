import { Body, Query } from '@nestjs/common';

import { apiMethods, EModules, FindAllDto, IdDto, Swagger } from '@/config';
import { GuardSwagger } from '@/config/swagger/decorators/guard-swagger.decorator';

import { CreateRoleDto, UpdateRoleDto } from '../dto';
import { RolesService } from '../services';

@GuardSwagger({
  tag: 'roles',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Swagger({
    restApi: apiMethods.post,
    idModule: EModules.ROLE,
  })
  create(@Body() CreateRoleDto: CreateRoleDto) {
    return this.rolesService.create(CreateRoleDto);
  }

  @Swagger({
    restApi: apiMethods.patch,
    idModule: EModules.ROLE,
  })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(updateRoleDto);
  }

  @Swagger({
    restApi: apiMethods.delete,
    idModule: EModules.ROLE,
  })
  delete(@Body() deleteRoleDto: IdDto) {
    return this.rolesService.deleteRole(deleteRoleDto);
  }

  @Swagger({
    restApi: apiMethods.get,
    idModule: EModules.ROLE,
    hadPagination: true,
  })
  findAll(@Query() findAllDto: FindAllDto) {
    return this.rolesService.findAllRoles(findAllDto);
  }
}
