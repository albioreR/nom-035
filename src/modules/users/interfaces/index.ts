import {
  Modules,
  Roles,
  RolesModules,
  RolesModulesPermissions,
  Users,
} from '@prisma/client';

export type TUserAttributesSelected = Pick<
  Users,
  'id' | 'fullName' | 'email' | 'password' | 'name' | 'lastname' | 'idRole'
>;

export type TUserAttributesNoPassword = Omit<
  TUserAttributesSelected,
  'password'
>;

type TRolesModules = Pick<RolesModules, 'id'>;

type TModulesAttributesSelected = Pick<
  Modules,
  'id' | 'name' | 'component' | 'description' | 'icon' | 'route' | 'idType'
>;

export interface IModulesRoles extends TRolesModules {
  modules: TModulesAttributesSelected;
}

export type TRolesModulePermissionsSelected = Pick<
  RolesModulesPermissions,
  'id' | 'idPermission'
>;

export interface IRolesModulesPermissionsBase extends IModulesRoles {
  rolesModulesPermissions: TRolesModulePermissionsSelected[];
}

export interface IPermissionsMapping {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
}

export interface IRolesModulesPermissionsMapping
  extends TModulesAttributesSelected {
  permissions: IPermissionsMapping;
}

export interface IRoles extends Pick<Roles, 'name' | 'id' | 'description'> {
  rolesModules: IRolesModulesPermissionsMapping[];
}

export interface ILoginResponse extends TUserAttributesSelected {
  roles: IRoles;
}
export type TLoginResponseNoPassword = Omit<ILoginResponse, 'password'>;

export interface IValidRoleAndEnterprise {
  idEnterprise: number;
  idRole: number;
}
