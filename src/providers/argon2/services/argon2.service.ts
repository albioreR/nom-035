/** 
 * @fileoverview The Argon2Service class provides methods for hashing and comparing passwords using Argon2 in a
NestJS application. */
import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class Argon2Service {
  /**
   * The hash function in TypeScript uses Argon2 to hash a password with a cost factor of 10.
   * @param {string} password - The `password` parameter is a string that represents the user's
   * password that needs to be hashed for security purposes.
   * @returns A Promise that resolves to a hashed version of the input password using Argon2 with a
   * cost factor of 10.
   */
  hashArgon2(password: string): Promise<string> {
    return argon2.hash(password);
  }
  /**
   * The function compares a password with a hash using Argon2 and returns a Promise with a boolean
   * result.
   * @param {string} password - The `password` parameter is a string that represents the plain text
   * password that a user enters when trying to log in to a system or application.
   * @param {string} hash - The `hash` parameter is a string that represents the hashed version of a
   * password. It is typically generated using a hashing algorithm like Argon2 to securely store and
   * compare passwords without storing the actual password in plain text.
   * @returns A Promise that resolves to a boolean value indicating whether the provided password
   * matches the given hash.
   */

  compareArgon2(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
