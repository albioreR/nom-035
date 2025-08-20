import {
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  apiConsumes as constantsApiConsumes,
  apiMessages,
  statusCodes,
} from '@/config/api';
import { PaginationInterceptor } from '@/config/common';
import { ModulesSecurity } from '@/providers/auth/decorators';
import { JwtAuthGuard } from '@/providers/auth/guards';

import { GenericResponse, GenericResponseError } from '../dto';
import {
  IMethodsDecoratorSwagger,
  ISwaggerResponseOptions,
} from '../interface';
/**
 * The Swagger function in TypeScript generates Swagger documentation decorators based on specified
 * options.
 * @param {ISwaggerResponseOptions}  - The `Swagger` function is a TypeScript function that generates
 * Swagger documentation for API endpoints based on the provided parameters. Here is an explanation of
 * each parameter:
 * @returns The `Swagger` function is returning a set of decorators based on the provided options and
 * configurations. These decorators are used to define the behavior and metadata of API endpoints in a
 * Swagger/OpenAPI documentation setup. The returned decorators include ApiResponse,
 * ApiForbiddenResponse, ApiConflictResponse, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse,
 * ApiInternalServerErrorResponse, ApiConsumes, and potentially additional decorators based on the `
 */

export const Swagger = ({
  status,
  restApi,
  link = '',
  apiConsumes = constantsApiConsumes.json,
  hadSecurity = false,
  idModule,
  hadPagination = false,
}: ISwaggerResponseOptions) => {
  const restOptions: IMethodsDecoratorSwagger = {
    Get,
    Post,
    Patch,
    Delete,
  };

  const decorators = [
    ApiResponse({
      status: status || statusCodes.ok,
      description:
        status === statusCodes.created
          ? apiMessages.created
          : apiMessages.success,
      type: GenericResponse,
    }),
    ApiForbiddenResponse({
      description: apiMessages.notPermission,
      type: GenericResponseError,
    }),
    ApiConflictResponse({
      description: apiMessages.conflict,
      type: GenericResponseError,
    }),
    ApiUnauthorizedResponse({
      type: GenericResponseError,
      description: apiMessages.unauthorized,
    }),
    ApiUnprocessableEntityResponse({
      type: GenericResponseError,
      description: apiMessages.unprocessableEntity,
    }),
    ApiInternalServerErrorResponse({
      type: GenericResponseError,
      description: apiMessages.internalServerError,
    }),
    ApiConsumes(apiConsumes),
    restOptions[restApi as keyof IMethodsDecoratorSwagger](link),
  ];

  if (hadSecurity) {
    decorators.push(ApiBearerAuth());
    decorators.push(UseGuards(JwtAuthGuard));
  }

  if (idModule) {
    decorators.push(ModulesSecurity(idModule));
  }

  if (hadPagination) {
    decorators.push(UseInterceptors(PaginationInterceptor));
  }

  return applyDecorators(...decorators);
};
