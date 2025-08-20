import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { parseValue, typeValidateDtoMigration } from '../constants';
import {
  IClassValidator,
  IDtoDecoratorsOptions,
  IDtoDecoratorsValidators,
  IParseValueReturn,
} from '../interfaces';
/**
 * The function `dtoDecorators` in TypeScript generates decorators based on provided options for DTO
 * properties.
 * @param {IDtoDecoratorsOptions}  - The `dtoDecorators` function takes in an object as a parameter
 * with the following properties:
 * @returns The `dtoDecorators` function returns a set of decorators based on the provided options.
 * These decorators include `ApiProperty`, `ApiPropertyOptional`, `IsNotEmpty`, `IsOptional`,
 * `Transform`, and additional decorators based on the `validatorsDtoOptions` array. The function
 * applies these decorators to the properties of a class based on the provided options and returns the
 * final set of decorators to be used
 */

export const dtoDecorators = ({
  swaggerOptions,
  validatorsDtoOptions = [],
  baseOptions,
}: IDtoDecoratorsOptions) => {
  const {
    isOptional = false,
    message,
    transform = false,
    type = 'number',
  } = baseOptions;

  const transformDecorator = Transform(({ value }) => {
    return transform
      ? parseValue(value)[type as keyof IParseValueReturn]
      : value;
  });

  const typesDto: PropertyDecorator[] = validatorsDtoOptions.map(
    ({
      typeDto,
      options,
      optionsRegExp,
      num = undefined,
    }: IDtoDecoratorsValidators) =>
      typeValidateDtoMigration({
        options: { message: options.message, each: options.each },
        optionRegExp: optionsRegExp,
        num,
      })[typeDto as keyof IClassValidator],
  );

  return applyDecorators(
    !isOptional
      ? ApiProperty({
          enumName: 'type',
          ...swaggerOptions,
        })
      : ApiPropertyOptional({ enumName: 'type', ...swaggerOptions }),
    !isOptional ? IsNotEmpty({ message }) : IsOptional(),
    transformDecorator,
    ...typesDto,
  );
};
