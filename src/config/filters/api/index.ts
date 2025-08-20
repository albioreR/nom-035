/**
 * @namespace HttpExceptionsFilter class is a custom exception filter in TypeScript for handling HTTP
 * exceptions in a NestJS application. */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { baseResponse } from '@/config/common/utils';

import { exceptionsMessages, IExceptionsMessages } from './constants';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  /**
   *  This function handles HTTP exceptions by extracting the status and message from the exception and
   * returning a JSON response with the appropriate status code and message.
   * @param {HttpException} exception - The `exception` parameter in the `catch` function represents the
   * error or exception that was caught during the execution of the code. In this case, it seems to be
   * specifically handling `HttpException` instances. The code retrieves information from the exception
   * such as the status code and message to construct a response to
   * @param {ArgumentsHost} host - The `host` parameter in the `catch` function represents the execution
   * context of the current request. It provides access to the underlying platform-specific arguments
   * host, which in this case is `ArgumentsHost`. The `ArgumentsHost` class allows you to switch the
   * context to the HTTP platform, giving you access
   * @returns The `catch` method is returning a JSON response with a status code and a message. The
   * response includes information about the exception that occurred, such as the status code and the
   * error message. The response is structured as an object with properties for success (set to false),
   * message (containing the error message), and potentially additional data depending on the exception.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message =
      exceptionsMessages[
        (exception.getResponse() as { message: string })[
          'message'
        ] as keyof IExceptionsMessages
      ] ?? (exception.getResponse() as { message: string })['message'];

    const resp = baseResponse({
      success: false,
      message: Array.isArray(
        (exception.getResponse() as { message: string })['message'],
      )
        ? (exception.getResponse() as { message: string })['message'][0]
        : message,
    });

    return response.status(status).json(resp);
  }
}
