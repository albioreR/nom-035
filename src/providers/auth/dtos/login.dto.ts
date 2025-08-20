import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class LoginDto {
  @dtoDecorators({
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.email),
    },
    swaggerOptions: {
      example: 'test@test.com',
      description: 'Escribir un correo válido',
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.email,
            dataType.string,
          ),
        },
      },
      {
        typeDto: typeDto.isEmail,
        options: {
          message: dtoValidatorMessage.wrongEmail,
        },
      },
    ],
  })
  email: string;

  @dtoDecorators({
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.password),
    },
    swaggerOptions: {
      example: 'contraseña genérico',
      description: 'Escribir una contraseña',
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.password,
            dataType.string,
          ),
        },
      },
    ],
  })
  password: string;
}
