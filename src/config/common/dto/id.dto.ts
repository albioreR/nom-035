import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config/dto-validators';

export class IdDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'id genérico',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.id),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.id,
            dataType.int,
          ),
        },
      },
    ],
  })
  id: number;
}
