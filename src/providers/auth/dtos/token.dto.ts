import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class TokenDto {
  @dtoDecorators({
    baseOptions: {
      isOptional: true,
    },
    swaggerOptions: {
      example: 'JWT',
      description: 'Escribir un token válido',
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.auth.token,
            dataType.string,
          ),
        },
      },
    ],
  })
  token: string;
}
