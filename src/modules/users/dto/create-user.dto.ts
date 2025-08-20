import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class CreateUserDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 'Fer',
      description: 'Nombre del usuario',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.name),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.name,
            dataType.string,
          ),
        },
      },
    ],
  })
  name: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Nu',
      description: 'Apellido del usuario',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.lastname),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.lastname,
            dataType.string,
          ),
        },
      },
    ],
  })
  lastname: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'fer@fer.com',
      description: 'Correo del usuario',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.email),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isEmail,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.email,
            dtoValidatorMessage.wrongEmail,
          ),
        },
      },
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.email,
            dataType.string,
          ),
        },
      },
    ],
  })
  email: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'id del rol',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.ids.idRole),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.page,
            dataType.int,
          ),
        },
      },
    ],
  })
  idRole: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'id de la empresa',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.page,
            dataType.int,
          ),
        },
      },
    ],
  })
  idEnterprise: number;
}
