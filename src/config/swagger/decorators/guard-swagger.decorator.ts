import { Controller, UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, ModulesGuard } from '@/providers/auth/guards';

import { ITagSwagger } from '../interface';

/**
 * The `GuardSwagger` function generates decorators for a Swagger API endpoint based on specified
 * parameters.
 * @param {ITagSwagger}  - The `GuardSwagger` function takes an object as a parameter with two
 * properties:
 * @returns The `GuardSwagger` function is returning a set of decorators based on the provided
 * parameters. If `hadSecurity` is true, it adds `ApiBearerAuth()` and `UseGuards(JwtAuthGuard,
 * ModulesGuard)` decorators to the list of decorators. Finally, it applies all the decorators using
 * the `applyDecorators` function and returns the result.
 */
export const GuardSwagger = ({ hadSecurity = true, tag = '' }: ITagSwagger) => {
  const decorators = [Controller(tag), ApiTags(tag)];

  if (hadSecurity) {
    decorators.push(ApiBearerAuth());
    decorators.push(UseGuards(JwtAuthGuard, ModulesGuard));
  }

  return applyDecorators(...decorators);
};
