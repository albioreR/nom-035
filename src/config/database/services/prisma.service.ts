/**
 * @fileoverview The `PrismaService` class extends `PrismaClient` and implements `OnModuleInit` to handle Prisma
database connections in a NestJS application. */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { operationsWithWhere, whereActive } from '../constants';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  /**
   * The `onModuleInit` function in TypeScript connects to Prisma and logs a message indicating
   * successful connection.
   */
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (operationsWithWhere.includes(params.action)) {
        if (!params.args.where) {
          params.args.where = {};
        }

        params.args.where = {
          ...params.args.where,
          ...whereActive,
        };
        if (params.args.include || params.args.select) {
          for (const relation in params.args.include || {}) {
            if (
              params.args.include[relation] &&
              !params.args.include[relation].where
            ) {
              params.args.include[relation].where = {
                ...whereActive,
              };
            }
          }

          for (const relation in params.args.select || {}) {
            if (
              params.args.select[relation] &&
              typeof params.args.select[relation] === 'object'
            ) {
              if (!params.args.select[relation].where) {
                params.args.select[relation].where = {
                  ...whereActive,
                };
              }
            }
          }
        }
      }

      return next(params);
    });

    this.logger.log('Prisma connected');
  }
}
