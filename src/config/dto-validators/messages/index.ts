export const dtoValidatorMessage = {
  wrongType: 'El tipo de dato no es válido',
  requiredField: (field: string) => `El campo ${field} es requerido`,
  wrongTypeField: (field: string, type: string) =>
    `El campo ${field} no es válido, debe ser de tipo [${type}]`,
  wrongEmail: 'El correo no es válido',
};
