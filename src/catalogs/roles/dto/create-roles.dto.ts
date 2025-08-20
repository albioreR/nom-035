import {
  dataType,
  dtoDecorators,
  dtoValidatorMessage,
  fieldsDto,
  typeDto,
} from '@/config';

export class CreateRoleDto {
  @dtoDecorators({
    swaggerOptions: {
      example: 'Desarrollador',
      description: 'Nombre del tipo de rol',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.general.name),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.general.name,
            dataType.string,
          ),
        },
      },
    ],
  })
  name: string;

  @dtoDecorators({
    swaggerOptions: {
      example:
        'El tipo de rol de DESARROLLADOR, es un rol solamente para usuarios que tienen como objetivo la manipulacion y revision de cambios en la plataforma',
      description: 'Descripcion del tipo de rol',
    },
    baseOptions: {
      message: dtoValidatorMessage.requiredField(fieldsDto.roles.description),
    },
    validatorsDtoOptions: [
      {
        typeDto: typeDto.isString,
        options: {
          message: dtoValidatorMessage.wrongTypeField(
            fieldsDto.roles.description,
            dataType.string,
          ),
        },
      },
    ],
  })
  description: string;
}
