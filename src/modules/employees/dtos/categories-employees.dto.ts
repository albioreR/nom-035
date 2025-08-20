import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  FindAllDto,
  typeDto,
} from '@/config';

export class CategoriesEmployeesDto extends FindAllDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'id de departamento',
    },
    baseOptions: {
      isOptional: true,
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.ids.idDepartment,
            dataType.int,
          ),
        },
      },
    ],
  })
  idDepartment: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'id turnos de trabajo',
    },
    baseOptions: {
      isOptional: true,
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.ids.idWorkShift,
            dataType.int,
          ),
        },
      },
    ],
  })
  idWorkShift: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Id por posición de trabajo',
    },
    baseOptions: {
      isOptional: true,
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isNumber,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.ids.idJobPosition,
            dataType.int,
          ),
        },
      },
    ],
  })
  idJobPosition: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Id del contrato',
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
