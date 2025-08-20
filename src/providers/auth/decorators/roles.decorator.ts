/**
 * @fileoverview This TypeScript code snippet is defining a function called `ModulesSecurity` that sets metadata for
modules based on the provided numbers. Here's a breakdown of what each part of the code is doing: */
import { SetMetadata } from '@nestjs/common';

export const MODULES_KEY = 'modules';

/**
 * The function `ModulesSecurity` in TypeScript sets metadata for modules based on the provided
 * numbers.
 * @param {number[]} modules - The `ModulesSecurity` function takes in a variable number of `modules`
 * as parameters. These modules are of type `number` and are passed as arguments to the function.
 */
export const ModulesSecurity = (...modules: number[]) =>
  SetMetadata(MODULES_KEY, modules);
