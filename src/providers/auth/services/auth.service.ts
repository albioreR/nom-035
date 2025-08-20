/**
 * @fileoverview The AuthService class in TypeScript handles user authentication, including login validation and JWT
token generation. */
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  baseResponse,
  handlerException,
  IBaseResponse,
  ICommonEmail,
  ICommonId,
  unauthorizedExceptionMessages,
} from '@/config';
import { TUserAttributesSelected, UserPrismaService } from '@/modules';

import { Argon2Service } from '../../argon2';
import { LoginDto, TokenDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly argon2Service: Argon2Service,
    @Inject(forwardRef(() => UserPrismaService))
    private readonly userPrismaService: UserPrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * This TypeScript function handles user login by validating the email and password, generating a JWT
   * token upon successful login.
   * @param {LoginDto}  - The `login` function is an asynchronous function that takes a `LoginDto`
   * object as a parameter, which includes an `email` and a `password`. The function attempts to find a
   * user by the provided email using the `userPrismaService`, then compares the provided password with
   * the user's
   * @returns The `login` function is returning a Promise that resolves to an object with the following
   * structure:
   */
  async login({
    email,
    password,
  }: LoginDto): Promise<IBaseResponse<TUserAttributesSelected>> {
    try {
      const { password: userPassword, ...user } =
        await this.userPrismaService.findByEmail(email);

      const validatePassword = await this.argon2Service.compareArgon2(
        password,
        userPassword,
      );

      if (!validatePassword)
        throw new UnauthorizedException(
          unauthorizedExceptionMessages.invalidCredentials,
        );

      return baseResponse<TUserAttributesSelected>({
        data: {
          ...user,
          token: this.generateJwt({ id: user.id, email: user.email }),
        },
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * The function `validJwt` generates a JWT token for a user and returns user data along with the token
   * in a response.
   * @param {Users} user - The `validJwt` function takes a `user` object of type `Users` as a parameter.
   * The `Users` type likely contains properties such as `id` and `email` that are used to generate a
   * JWT token. The function then fetches user data from a Prisma service based
   * @returns The `validJwt` function returns a Promise that resolves to an object of type
   * `IBaseResponse<TUserAttributesSelected>`. This object contains user data without the password
   * (retrieved from the `userPrismaService`), along with a generated JWT token. If the function
   * executes successfully, it returns the user data and token wrapped in a base response. If an error
   * occurs during execution,
   */
  async validJwt(
    { token }: TokenDto,
    user: ICommonId & ICommonEmail,
  ): Promise<IBaseResponse<TUserAttributesSelected>> {
    try {
      const { password: _password, ...userData } =
        await this.userPrismaService.findByEmail(user.email);

      return baseResponse<{ token: string }>({
        data: {
          ...userData,
          token,
        },
      });
    } catch (error) {
      return handlerException(error);
    }
  }

  /**
   * The `generateJwt` function generates a JSON Web Token (JWT) using the provided data.
   * @param data - The `data` parameter in the `generateJwt` function is expected to be an object that
   * implements the `ICommonId` and `ICommonEmail` interfaces. These interfaces likely define properties
   * related to user identification and email address. The function then uses the `jwtService` to sign
   * the data
   * @returns A JSON Web Token (JWT) is being returned.
   */
  generateJwt(data: ICommonId & ICommonEmail): string {
    return this.jwtService.sign(data);
  }
}
