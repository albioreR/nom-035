/**
 * @fileoverview The UserService class in this TypeScript code handles CRUD operations for users, including finding
all users, creating new users with email notifications, updating user information, and deleting
users. */
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  baseResponse,
  FindAllDto,
  getWhereFilter,
  handlerException,
  IBaseResponse,
  IdDto,
} from '@/config';
import { eventsEmitter, ISendNewUser, templates } from '@/providers';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserCreatedEmailEvent } from '../events';
import { UserPrismaService } from '../helpers';
import { TUserAttributesNoPassword } from '../interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly userPrismaService: UserPrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * This TypeScript function asynchronously finds all user attributes based on specified criteria and
   * returns a base response.
   * @param {FindAllDto}  - The `findAll` method takes a `FindAllDto` object as a parameter with the
   * following properties:
   * @returns The `findAll` method is returning a Promise that resolves to an object of type
   * `IBaseResponse` containing an array of `TUserAttributesNoPassword` data. The method retrieves data
   * from the database using pagination fields and a filter based on the `like` and `likeField`
   * parameters provided in the `FindAllDto`. If successful, it returns a base response object with the
   * retrieved data
   */
  async findAll({
    like,
    likeField,
    skip,
    take,
  }: FindAllDto): Promise<IBaseResponse<TUserAttributesNoPassword[]>> {
    try {
      const where = getWhereFilter({ likeField, like });

      const data = await this.userPrismaService.findMany({
        skip,
        take,
        where,
      });

      return baseResponse({
        data,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * The function creates a new user, validates role and enterprise, checks for duplicate email, sends a
   * welcome email, and returns the user data.
   * @param {CreateUserDto}  - The `create` function is an asynchronous function that takes a
   * `CreateUserDto` object as a parameter. The properties of the `CreateUserDto` object include
   * `email`, `idEnterprise`, `idRole`, `lastname`, and `name`.
   * @returns The `create` function is returning a Promise that resolves to an object with the following
   * structure:
   */
  async create({
    email,
    idEnterprise,
    idRole,
    lastname,
    name,
  }: CreateUserDto): Promise<IBaseResponse<TUserAttributesNoPassword>> {
    try {
      await this.userPrismaService.validRoleAndEnterprise({
        idEnterprise,
        idRole,
      });

      await this.userPrismaService.validateDuplicate(email);

      const { password, ...user } = await this.userPrismaService.create({
        email,
        idEnterprise,
        idRole,
        lastname,
        name,
      });

      this.eventEmitter.emit(
        eventsEmitter.user.created,
        new UserCreatedEmailEvent<ISendNewUser>({
          subject: 'Bienvenido a la plataforma',
          to: [user.email],
          template: templates.email,
          context: {
            email: user.email,
            password,
          },
        }),
      );

      return baseResponse({
        data: user,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * This TypeScript function updates user information based on the provided data and returns a
   * response with the updated user attributes.
   * @param {UpdateUserDto}  - The `update` function takes an object of type `UpdateUserDto` as a
   * parameter. The properties of the `UpdateUserDto` object are as follows:
   * @returns The `update` function is returning a Promise that resolves to an object of type
   * `IBaseResponse<TUserAttributesNoPassword>`. This object contains the updated user data after
   * performing the necessary validations and updates in the function. If there are no errors during
   * the process, the updated user data is returned in the response. If an error occurs, the function
   * will catch the error and return the handled exception
   */
  async update({
    lastname,
    name,
    email,
    idRole,
    idEnterprise,
    id,
  }: UpdateUserDto): Promise<IBaseResponse<TUserAttributesNoPassword>> {
    try {
      const where = { id };

      await this.userPrismaService.validRoleAndEnterprise({
        idEnterprise,
        idRole,
      });

      await this.userPrismaService.findById(id);

      const data = await this.userPrismaService.update({
        where,
        data: {
          lastname,
          name,
          email,
          idRole,
        },
      });

      return baseResponse({
        data,
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * This TypeScript function deletes a user record by ID using Prisma and returns a base response.
   * @param {IdDto}  - The `delete` method is an asynchronous function that takes an object with an `id`
   * property as a parameter. The `id` is used to identify the record that needs to be deleted from the
   * database.
   * @returns The `delete` method is returning a Promise that resolves to an object of type
   * `IBaseResponse<unknown>`. This object is either created by the `baseResponse` function if the
   * deletion is successful, or by the `handlerException` function if an error occurs during the
   * deletion process.
   */
  async delete({ id }: IdDto): Promise<IBaseResponse<unknown>> {
    try {
      const where = { id };

      await this.userPrismaService.findById(id);

      await this.userPrismaService.delete({
        where,
      });

      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }
}
