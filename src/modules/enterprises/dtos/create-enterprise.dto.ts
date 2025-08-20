/* eslint-disable no-undef */
import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class CreateEnterpriseDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 'Facebook',
      description: 'Nombre de la empresa',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.businessName,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.businessName,
            dataType.string,
          ),
        },
      },
    ],
  })
  businessName: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Meta Inc.',
      description: 'Nombre comercial',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.comercialName,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.comercialName,
            dataType.string,
          ),
        },
      },
    ],
  })
  comercialName: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Mack Zuckerberg',
      description: 'Nombre del representante legal',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.enterprise.legalRepresentative,
      ),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.legalRepresentative,
            dataType.string,
          ),
        },
      },
    ],
  })
  legalRepresentative: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'url firebase',
      description: 'imagen',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.image,
            dataType.string,
          ),
        },
      },
    ],
  })
  image: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Ciudad',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.enterprise.idCity),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.enterprise.idCity,
            dataType.number,
          ),
        },
      },
    ],
  })
  idCity: number;

  @dtoDecorators({
    baseOptions: {
      isOptional: true,
    },
    swaggerOptions: {
      format: 'binary',
      type: 'string',
    },
  })
  logo: Express.Multer.File;
}
