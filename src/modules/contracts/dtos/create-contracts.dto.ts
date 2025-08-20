import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class CreateContractsDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 'Contrato de xik',
      description: 'Titulo del contrato',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.title),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.title,
            dataType.string,
          ),
        },
      },
    ],
  })
  title: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 50,
      description:
        'Cantidad de empleados tratados en el contrato - Esto marcara el tipo de prueba que pueden seleccionar',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.contracts.employeesCount,
      ),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.contracts.employeesCount,
            dataType.number,
          ),
        },
      },
    ],
  })
  employeesCount: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Id de la prueba',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(
        fieldsDto.contracts.idTypeTest,
      ),
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.contracts.idTypeTest,
            dataType.int,
          ),
        },
      },
    ],
  })
  idTypeTest: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 15,
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
  idEnterprise: number;

  @dtoDecorators({
    swaggerOptions: {
      example: '2024-01-01',
      description: 'Fecha de inicio del contrato',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.contracts.startDate),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.contracts.startDate,
            dataType.string,
          ),
        },
      },
    ],
  })
  startDate: string;

  @dtoDecorators({
    swaggerOptions: {
      example: '2024-01-01',
      description: 'Fecha de termino del contrato',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.contracts.endDate),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.contracts.endDate,
            dataType.string,
          ),
        },
      },
    ],
  })
  endDate: string;

  @dtoDecorators({
    swaggerOptions: {
      type: 'string',
      format: 'binary',
    },
    baseOptions: {
      isOptional: true,
    },
  })
  contract: any;
}
