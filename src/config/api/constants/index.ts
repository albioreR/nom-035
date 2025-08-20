import { IApiConsumes } from '../interfaces';

export const apiMessages = {
  notPermission:
    'No cuentas con suficientes permisos para acceder a este recurso',
  conflict:
    'No se pudo completar la solicitud debido a un conflicto en el estado actual del recurso',
  unauthorized: 'No estas autorizado para acceder a este recurso',
  unprocessableEntity:
    'La solicitud no se pudo procesar debido a un error en los datos enviados',
  internalServerError: 'Error interno del servidor',
  success: 'Petición exitosa',
  created: 'Recurso creado exitosamente',
};

export const apiConsumes: IApiConsumes = {
  json: 'application/json',
  multipart: 'multipart/form-data',
};

export const statusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  unprocessableEntity: 422,
  internalServerError: 500,
};

export const apiMethods = {
  get: 'Get',
  post: 'Post',
  delete: 'Delete',
  patch: 'Patch',
};
