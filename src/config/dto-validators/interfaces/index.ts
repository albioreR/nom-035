import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
import { ValidationOptions } from 'class-validator';

export interface IDtoDecoratorsValidators {
  typeDto: string;
  options: {
    message: string;
    each: boolean;
  };
  optionsRegExp: RegExp;
  num: number | undefined;
}

export interface IClassValidator {
  isString: PropertyDecorator;
  isInt: PropertyDecorator;
  isEmail: PropertyDecorator;
  isNumber: PropertyDecorator;
  isObject: PropertyDecorator;
  isUuid: PropertyDecorator;
  isArray: PropertyDecorator;
  isDate: PropertyDecorator;
  matches?: PropertyDecorator;
  minLength?: PropertyDecorator;
  maxLength?: PropertyDecorator;
  isBoolean: PropertyDecorator;
  isDateString?: PropertyDecorator;
  arrayMaxSize?: PropertyDecorator;
  arrayMinSize?: PropertyDecorator;
  isOptional?: PropertyDecorator;
  isIn?: PropertyDecorator;
}

export interface IValidationOptionalOrTypes {
  optional?: boolean;
  typeDto?: string;
  descriptionValidation?: string;
  messageValidation?: string;
}

export interface IOptionsDto {
  message: string;
  each?: boolean;
}

export interface IValidatorsDto {
  typeDto: string;

  options: ValidationOptions;

  optionsRegExp?: RegExp;

  num?: number | number[] | string[];
}

export interface IBaseOptions {
  isOptional?: boolean;
  message?: string;
  transform?: boolean;
  type?: string;
}

export interface IDtoDecoratorsOptions {
  swaggerOptions: SchemaObjectMetadata;
  validatorsDtoOptions?: IValidatorsDto[];
  baseOptions?: IBaseOptions;
}

export interface IParseValueReturn {
  number: number;
  string: string;
  boolean: boolean;
}
