/**
 * @fileoverview The UserPrismaService class in TypeScript handles user-related operations such as finding users by
email, validating duplicates, finding users by ID, updating user information, deleting users, and
creating new users. */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { permissionsId, RolesPrismaService } from '@/catalogs';
import {
  getBooleanFromArray,
  IPrismaOptions,
  IPrismaUpdate,
  IPrismaWhereFilter,
  PrismaService,
  unauthorizedExceptionMessages,
} from '@/config';
import { removeInactive } from '@/config/common/utils/prisma.util';
import { EnterprisesPrismaService } from '@/modules/enterprises';
import { Argon2Service } from '@/providers';

import { CreateUserDto } from '../dto';
import {
  ILoginResponse,
  IRolesModulesPermissionsBase,
  IRolesModulesPermissionsMapping,
  IValidRoleAndEnterprise,
  TLoginResponseNoPassword,
  TRolesModulePermissionsSelected,
  TUserAttributesNoPassword,
  TUserAttributesSelected,
} from '../interfaces';
import { userMessages } from '../messages';

@Injectable()
export class UserPrismaService {
  constructor(
    private prisma: PrismaService,
    private readonly rolePrismaService: RolesPrismaService,
    private readonly enterprisesPrismaService: EnterprisesPrismaService,
    private readonly argon2Service: Argon2Service,
  ) {}

  /**
   * The function `setPermissionsByModules` maps roles to their corresponding module permissions based
   * on specified criteria.
   * @param {IRolesModulesPermissionsBase[]} rolesModules - The `setPermissionsByModules` function
   * takes an array of `IRolesModulesPermissionsBase` objects as input, where each object contains
   * `rolesModulesPermissions` and `modules` properties. The function then maps over this array and
   * returns an array of `IRolesModulesPermissionsMapping` objects, where
   * @returns The `setPermissionsByModules` function is returning an array of objects that represent
   * the permissions mapping for each module based on the roles and permissions assigned to them. Each
   * object in the array contains information about the module and its corresponding permissions for
   * create, read, update, and delete operations.
   */
  setPermissionsByModules(
    rolesModules: IRolesModulesPermissionsBase[],
  ): IRolesModulesPermissionsMapping[] {
    return rolesModules.map(({ rolesModulesPermissions, modules }) => ({
      ...modules,
      permissions: {
        create: getBooleanFromArray<TRolesModulePermissionsSelected>({
          data: rolesModulesPermissions,
          property: 'idPermission',
          value: permissionsId.create,
        }),
        read: getBooleanFromArray<TRolesModulePermissionsSelected>({
          data: rolesModulesPermissions,
          property: 'idPermission',
          value: permissionsId.read,
        }),
        update: getBooleanFromArray<TRolesModulePermissionsSelected>({
          data: rolesModulesPermissions,
          property: 'idPermission',
          value: permissionsId.update,
        }),
        delete: getBooleanFromArray<TRolesModulePermissionsSelected>({
          data: rolesModulesPermissions,
          property: 'idPermission',
          value: permissionsId.delete,
        }),
      },
    }));
  }

  /**
   * The function findByEmail retrieves a user by their email address and returns their information
   * along with their roles and permissions.
   * @param {string} email - The `findByEmail` function you provided is an asynchronous function that
   * retrieves a user from a database based on their email address. It returns a Promise that resolves
   * to an `ILoginResponse` object or `null`.
   * @returns The `findByEmail` function returns a Promise that resolves to an object of type
   * `ILoginResponse` or `null`. The function first queries the database to find a user with the
   * provided email address and active status. If a user is found, the function returns an object
   * containing various user details such as id, role, enterprise, full name, email, password, and roles
   * with associated modules and
   */
  async findByEmail(email: string): Promise<ILoginResponse | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        roles: {
          isNot: null,
        },
      },
      select: {
        id: true,
        idRole: true,
        fullName: true,
        email: true,
        password: true,
        name: true,
        lastname: true,
        roles: {
          select: {
            id: true,
            name: true,
            description: true,
            rolesModules: {
              select: {
                id: true,
                modules: {
                  select: {
                    id: true,
                    name: true,
                    component: true,
                    description: true,
                    icon: true,
                    route: true,
                    idType: true,
                    active: true,
                  },
                },
                rolesModulesPermissions: {
                  select: {
                    id: true,
                    idPermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        unauthorizedExceptionMessages.invalidCredentials,
      );
    }

    const userMapping = {
      ...user,
      roles: {
        ...user.roles,
        rolesModules: this.setPermissionsByModules(user.roles.rolesModules),
      },
    };

    const userMap = removeInactive(userMapping);

    return userMap;
  }

  /**
   * The function `validateDuplicate` checks if a user with a given email already exists and throws an
   * exception if a duplicate is found.
   * @param {string} email - The `validateDuplicate` function takes an `email` parameter of type string.
   * This function checks if there is a user in the database with the provided email that is also active.
   * If a user with the same email and active status is found, it throws a `ConflictException` with a
   * message indicating
   */
  async validateDuplicate(email: string): Promise<void> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException(userMessages.userDuplicate);
    }
  }

  /**
   * This TypeScript function asynchronously finds a user by their ID and returns selected user
   * attributes excluding the password, throwing an error if the user is not found.
   * @param {number} id - The `findById` method takes an `id` parameter of type number, which is used to
   * search for a user in the database based on their unique identifier.
   * @returns The `findById` method is returning a Promise that resolves to either a
   * `TUserAttributesNoPassword` object or `null`. The method first queries the database using Prisma to
   * find a user with the specified `id` and `active` status. If a user is found, the method returns an
   * object containing the selected user attributes (id, fullName, email, name, lastname, idRole
   */
  async findById(id: number): Promise<TUserAttributesNoPassword | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        name: true,
        lastname: true,
        idRole: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(userMessages.userNotFound);
    }

    return user;
  }

  /**
   * The function findByIdWithRoles retrieves a user with associated roles and permissions based on the
   * provided user ID.
   * @param {number} id - The `findByIdWithRoles` function takes an `id` parameter of type number. This
   * function is used to retrieve a user with their roles and permissions based on the provided `id`. It
   * queries the database using Prisma to find a user with the specified `id` and active status.
   * @returns The `findByIdWithRoles` function returns a Promise that resolves to a
   * `TLoginResponseNoPassword` object or `null`. The object contains user information such as id,
   * fullName, email, name, lastname, idRole, idEnterprise, and roles. The roles object includes role
   * details like id, name, description, and rolesModules. The rolesModules further include module
   * information like id, name
   */
  async findByIdWithRoles(
    id: number,
  ): Promise<TLoginResponseNoPassword | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        name: true,
        lastname: true,
        idRole: true,
        password: false,
        roles: {
          select: {
            id: true,
            name: true,
            description: true,
            rolesModules: {
              select: {
                id: true,
                modules: {
                  select: {
                    id: true,
                    name: true,
                    component: true,
                    description: true,
                    icon: true,
                    route: true,
                    idType: true,
                  },
                },
                rolesModulesPermissions: {
                  select: {
                    id: true,
                    idPermission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(userMessages.userNotFound);
    }

    return {
      ...user,
      roles: {
        ...user.roles,
        rolesModules: this.setPermissionsByModules(user.roles.rolesModules),
      },
    };
  }

  /**
   * The function findMany get a list of users based on the specified criteria and returns an array of
   * @param {IPrismaOptions<Prisma.UsersWhereInput>} - This params have params to filter and set criterio to prisma query
   * queries the database using Prisma to find a user with the specified `id` and active status.
   * @returns The list to users with the selected attributes
   */
  async findMany({
    skip,
    take,
    where,
  }: IPrismaOptions<Prisma.UsersWhereInput>): Promise<
    TUserAttributesNoPassword[]
  > {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        name: true,
        lastname: true,
        idRole: true,
      },
      skip,
      take,
      where: {
        active: true,
        ...where,
      },
    });
  }

  /**
   * The function update just update the user with the specified criteria and returns the selected
   * @param {IPrismaUpdate<Prisma.UsersWhereUniqueInput,Prisma.XOR<Prisma.UsersUpdateInput, Prisma.UsersUncheckedUpdateInput>} - Set criteria to update the user
   * @returns The updated user with the selected attributes
   */
  async update({
    data,
    where,
  }: IPrismaUpdate<
    Prisma.UsersWhereUniqueInput,
    Prisma.XOR<Prisma.UsersUpdateInput, Prisma.UsersUncheckedUpdateInput>
  >): Promise<TUserAttributesNoPassword> {
    const { id, email, lastname, fullName, name, idRole } =
      await this.prisma.users.update({
        where,
        data,
        select: {
          id: true,
          email: true,
          fullName: true,
          name: true,
          lastname: true,
          idRole: true,
        },
      });

    return {
      id,
      email,
      fullName,
      name,
      lastname,
      idRole,
    };
  }

  /**
   * The function delete just update the user with the specified criteria and returns the selected
   * @param { IPrismaWhereFilter<Prisma.UsersWhereUniqueInput>} - Set criteria to delete the user}
   * @returns The deleted user with the selected attributes
   */
  async delete({
    where,
  }: IPrismaWhereFilter<Prisma.UsersWhereUniqueInput>): Promise<void> {
    await this.prisma.users.update({
      where,
      data: {
        active: false,
      },
      select: {
        active: true,
      },
    });
  }

  /**
   * The function validRoleAndEnterprise checks if the role and enterprise exist in the database.
   * @param {IValidRoleAndEnterprise} - The `validRoleAndEnterprise` function takes an object with
   */
  async validRoleAndEnterprise({
    idRole,
    idEnterprise,
  }: IValidRoleAndEnterprise): Promise<void> {
    if (idRole) {
      await this.rolePrismaService.findByIdRole(idRole);
    }

    if (idEnterprise) {
      await this.enterprisesPrismaService.validate(idEnterprise);
    }
  }

  /**
   * The function generatePassword generates a random password for a new user.
   * @returns The `generatePassword` function returns a random string of 8 characters that can be used
   */
  private generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  /**
   * The function create creates a new user record in the database and returns the selected user
   * attributes.
   * @param {CreateUserDto} - The `create` function takes a `CreateUserDto` object as input, which
   * contains the data needed to create a new user record in the database. The function then creates a
   * new user record using the provided data and returns the selected user attributes.
   * @returns The `create` function returns a Promise that resolves to a `TUserAttributesSelected`
   * object. This object contains the selected user attributes such as id, email, fullName, name,
   * lastname, idRole, idEnterprise, and password.
   */
  async create(data: CreateUserDto): Promise<TUserAttributesSelected> {
    const passwordRandom = this.generatePassword();

    const passwordEncoded = await this.argon2Service.hashArgon2(passwordRandom);

    const { id, email, fullName, name, lastname, idRole } =
      await this.prisma.users.create({
        data: {
          ...data,
          password: passwordEncoded,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          name: true,
          lastname: true,
          idRole: true,
          password: true,
        },
      });

    return {
      id,
      email,
      fullName,
      name,
      lastname,
      idRole,
      password: passwordRandom,
    };
  }
}
