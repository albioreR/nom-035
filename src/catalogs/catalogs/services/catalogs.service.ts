/**
 * @fileoverview The CatalogsService class in TypeScript is an Injectable service that retrieves static catalog data
from various Prisma services. */
import { Injectable } from '@nestjs/common';

import { DepartmentsPrismaService } from '@/catalogs/departments';
import { JobPositionsPrismaService } from '@/catalogs/job-positions';
import { ModulesPrismaService } from '@/catalogs/modules';
import { PermissionsPrismaService } from '@/catalogs/permissions';
import { RolesPrismaService } from '@/catalogs/roles';
import { SectionsPrismaService } from '@/catalogs/sections';
import { StatesPrismaService } from '@/catalogs/states';
import { TypeTestPrismaService } from '@/catalogs/type-test';
import { TypesModulePrismaService } from '@/catalogs/types-module';
import { WorkShiftsPrismaService } from '@/catalogs/work-shifts';
import { baseResponse, handlerException, PrismaService } from '@/config';
import { EnterprisesPrismaService } from '@/modules';

@Injectable()
export class CatalogsService {
  constructor(
    private readonly modulesPrismaService: ModulesPrismaService,
    private readonly permissionsPrismaService: PermissionsPrismaService,
    private readonly rolesPrismaService: RolesPrismaService,
    private readonly statesPrismaService: StatesPrismaService,
    private readonly typeTestPrismasService: TypeTestPrismaService,
    private readonly typesModulePrismaService: TypesModulePrismaService,
    private readonly sectionsPrismaService: SectionsPrismaService,
    private readonly departmentsPrismaService: DepartmentsPrismaService,
    private readonly jobPositionsPrismaService: JobPositionsPrismaService,
    private readonly workShiftsPrismaService: WorkShiftsPrismaService,
    private prisma: PrismaService,
    private readonly enterprisesPrismaService: EnterprisesPrismaService,
  ) {}

  /**
   * The function `staticCatalog` asynchronously fetches data from multiple Prisma services and returns
   * a response with the fetched data.
   * @returns The `staticCatalog` method is returning a base response object that contains data from
   * various catalog methods. The data includes modules, permissions, roles, states, typeTest, and
   * typesModule. If an error occurs during the execution of any of the catalog methods, the method will
   * catch the error and return an exception handler response.
   */
  async staticCatalog() {
    try {
      const data = await this.prisma.$transaction(async (tsx) => {
        const modules = await this.modulesPrismaService.catalog({ tsx });
        const permissions = await this.permissionsPrismaService.catalog({
          tsx,
        });
        const roles = await this.rolesPrismaService.catalog({ tsx });
        const states = await this.statesPrismaService.catalog({ tsx });
        const typeTest = await this.typeTestPrismasService.catalog({ tsx });
        const typesModule = await this.typesModulePrismaService.catalog({
          tsx,
        });
        const sections = await this.sectionsPrismaService.catalog({ tsx });
        const departments = await this.departmentsPrismaService.catalog({
          tsx,
        });
        const jobPositions = await this.jobPositionsPrismaService.catalog({
          tsx,
        });
        const workShifts = await this.workShiftsPrismaService.catalog({ tsx });

        const enterprise = await this.enterprisesPrismaService.findMany(
          {},
          { tsx },
        );

        return {
          departments,
          jobPositions,
          modules,
          permissions,
          roles,
          sections,
          states,
          typesModule,
          typeTest,
          workShifts,
          enterprise,
        };
      });
      return baseResponse({
        data,
      });
    } catch (error) {
      return handlerException(error);
    }
  }
}
