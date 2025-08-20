import { httpExceptionFilter } from '../constants';
import { IError, IHttpExceptionFIlter } from '../interfaces';
/**
 * The function `handlerException` handles exceptions by returning the appropriate error message based
 * on the status code.
 * @param {IError}  - It looks like the `handlerException` function takes an object as a parameter with
 * a property `status` defaulting to 500 and other properties spread into an `error` object. The
 * function then uses the `httpExceptionFilter` object to handle the error based on the provided status
 * code.
 * @returns The `handlerException` function is returning the result of calling the
 * `httpExceptionFilter` function with the `error` object as the argument. The specific function being
 * called from `httpExceptionFilter` is determined by the `status` property of the `error` object,
 * which is used as a key to access the corresponding function from the `IHttpExceptionFilter`
 * interface.
 */

export const handlerException = ({ status = 500, ...error }: IError) => {
  return httpExceptionFilter[status as keyof IHttpExceptionFIlter](error);
};
