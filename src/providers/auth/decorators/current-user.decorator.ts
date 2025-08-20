/** 
 * @fileoverview This TypeScript code snippet is creating a custom parameter decorator called `CurrentUser` using the
`* createParamDecorator` function provided by the NestJS framework. */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* This code snippet is defining a custom parameter decorator named `CurrentUser` in TypeScript. The
decorator is created using the `createParamDecorator` function provided by the NestJS framework. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
