import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

import { CreateEnterpriseDto } from './create-enterprise.dto';

export class UpdateEnterpriseDto extends CreateEnterpriseDto {
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
