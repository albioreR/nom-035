import { IBaseResponse } from '../interfaces';

/**
 * The function `baseResponse` returns a response object with default values for success, data, info,
 * and message.
 * @param  - The `baseResponse` function takes in an object with the following properties:
 */
export const baseResponse = <T>({
  success = true,
  data = {},
  info = {},
  message = 'Operación realizada correctamente',
}: IBaseResponse<T>) => ({ success, data, info, message });
