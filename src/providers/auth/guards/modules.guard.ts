import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { IRolesModulesPermissionsMapping } from '@/modules';

import { MODULES_KEY } from '../decorators';

@Injectable()
export class ModulesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<number[]>(
      MODULES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const { user } = req;

    return user.roles.rolesModules.some(
      ({ id }: IRolesModulesPermissionsMapping) => requiredRoles.includes(id),
    );
  }
}
