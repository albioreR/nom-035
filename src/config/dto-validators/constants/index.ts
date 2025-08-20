import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';

import { IClassValidator, IParseValueReturn } from '../interfaces';

export const parseValue = (value: string | boolean): IParseValueReturn => {
  let booleanValues;
  if (value !== undefined && value !== 'undefined') {
    booleanValues = value === 'true' || value === true;
  }
  return {
    number: Number(value),
    string: String(value),
    boolean: value === 'undefined' ? undefined : booleanValues,
  };
};

export const typeValidateDtoMigration = ({
  options,
  optionRegExp,
  num,
}: {
  optionRegExp?: RegExp;
  options: ValidationOptions;
  num?: number | number[] | string[];
}): IClassValidator => ({
  isString: IsString(options),
  isInt: IsInt(options),
  isEmail: IsEmail({}, options),
  isNumber: IsNumber({}, options),
  isUuid: IsUUID('all', options),
  isObject: IsObject(),
  isArray: IsArray(options),
  isDate: IsDate(options),
  matches: Matches(optionRegExp, options),
  minLength: MinLength(num as number, options),
  maxLength: MaxLength(num as number, options),
  isBoolean: IsBoolean(options),
  isDateString: IsDateString({}, options),
  arrayMaxSize: ArrayMaxSize(num as number, options),
  arrayMinSize: ArrayMinSize(num as number, options),
  isOptional: IsOptional(options),
  isIn: IsIn(num as number[] | string[], options),
});

export const fieldsDto = {
  general: {
    email: 'email',
    password: 'password',
    id: 'id',
    name: 'name',
    lastname: 'lastname',
    rfc: 'rfc',
    title: 'title',
    idEnterprise: 'idEnterprise',
  },
  auth: {
    token: 'token',
  },
  pagination: {
    page: 'page',
    results: 'results',
    like: 'like',
    likeField: 'likeField',
  },
  ids: {
    idRole: 'idRole',
    idDepartment: 'idDepartment',
    idWorkShift: 'idWorkShift',
    idJobPosition: 'idJobPosition',
    idEnterprise: 'idEnterprise',
    idContract: 'idContract',
  },
  enterprise: {
    idCity: 'idCity',
    businessName: 'businessName',
    comercialName: 'comercialName',
    legalRepresentative: 'legalRepresentative',
    rfc: 'rfc',
    street: 'street',
    exteriorNumber: 'exteriorNumber',
    interiorNumber: 'interiorNumber',
    suburb: 'suburb',
    postalCode: 'postalCode',
    country: 'country',
    enterpriseType: 'enterpriseType',
    turnEnterprise: 'turnEnterprise',
    tellphone: 'tellphone',
    email: 'email',
    image: 'image',
  },
  roles: {
    maxLenght: 'maxLenght',
    description: 'description',
  },
  contracts: {
    employeesCount: 'employeesCount',
    idTypeTest: 'idTypeTest',
    startDate: 'startDate',
    endDate: 'endDate',
  },
};

export const typeDto = {
  isString: 'isString',
  isInt: 'isInt',
  isEmail: 'isEmail',
  isNumber: 'isNumber',
  isLenght: 'isLenght',
};

export const dataType = {
  string: 'cadena de texto',
  number: 'número',
  boolean: 'booleano',
  int: 'entero',
};
