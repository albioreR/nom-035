/* eslint-disable no-undef */
import { Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  apiConsumes,
  apiMethods,
  EModules,
  GuardSwagger,
  Swagger,
} from '@/config';

import { CategoriesEmployeesDto, ImportEmployeesDto } from '../dtos';
import { EmployeesService } from '../services';

@GuardSwagger({
  tag: 'employees',
})
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Swagger({
    restApi: apiMethods.get,
    idModule: EModules.EMPLOYEES,
    hadPagination: true,
  })
  findAll(@Query() findAllDto: CategoriesEmployeesDto) {
    return this.employeesService.findAll(findAllDto);
  }

  @Swagger({
    restApi: apiMethods.post,
    idModule: EModules.EMPLOYEES,
    apiConsumes: apiConsumes.multipart,
    link: 'import',
  })
  @UseInterceptors(FileInterceptor('file'))
  importData(
    @Body() importEmployeesDto: ImportEmployeesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.employeesService.importData(importEmployeesDto, file);
  }
}
