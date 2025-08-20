/* eslint-disable no-undef */
import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class ImportEmployeesDto {
  @dtoDecorators({
    baseOptions: {
      isOptional: true,
    },
    swaggerOptions: {
      format: 'binary',
      type: 'string',
    },
  })
  file: Express.Multer.File;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Id de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.ids.idContract),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.ids.idContract,
            dataType.int,
          ),
        },
      },
    ],
  })
  idContract: number;
}
