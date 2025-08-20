import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config/dto-validators';

import { FindAllDto } from './find-all.dto';

export class IdEnterpriseFindAllDto extends FindAllDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Id de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.general.idEnterprise,
      ),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.idEnterprise,
            dataType.int,
          ),
        },
      },
    ],
  })
  idEnterprise?: number;
}
