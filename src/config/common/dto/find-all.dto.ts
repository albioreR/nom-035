import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config/dto-validators';

export class FindAllDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Pagina de resultados',
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
            fieldsDto.pagination.page,
            dataType.int,
          ),
        },
      },
    ],
  })
  page?: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 1,
      description: 'Cantidad de resultados por pagina',
    },
    baseOptions: {
      isOptional: true,
      transform: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isInt,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.results,
            dataType.int,
          ),
        },
      },
    ],
  })
  results?: number;

  @dtoDecorators({
    swaggerOptions: {
      example: 'Pedro',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.like,
            dataType.string,
          ),
        },
      },
    ],
  })
  like?: string;

  @dtoDecorators({
    swaggerOptions: {
      example: 'name',
    },
    baseOptions: {
      isOptional: true,
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.pagination.likeField,
            dataType.string,
          ),
        },
      },
    ],
  })
  likeField?: string;

  skip: number;

  take: number;
}
