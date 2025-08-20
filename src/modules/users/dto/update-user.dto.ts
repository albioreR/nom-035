import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'id del usuario',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
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
