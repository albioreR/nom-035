/* eslint-disable no-undef */
import { Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  apiConsumes as apiConsumesConstants,
  apiMethods,
  EModules,
  GuardSwagger,
  Swagger,
} from '@/config';

import { CreateEnterpriseDto, UpdateEnterpriseDto } from '../dtos';
import { EnterprisesService } from '../services';

@GuardSwagger({
  tag: 'enterprises',
})
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Swagger({
    restApi: apiMethods.post,
    apiConsumes: apiConsumesConstants.multipart,
    idModule: EModules.ENTERPRISE,
  })
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @Body() createEnterpriseDto: CreateEnterpriseDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.enterprisesService.create(createEnterpriseDto, logo);
  }

  @Swagger({
    restApi: apiMethods.patch,
    apiConsumes: apiConsumesConstants.multipart,
    idModule: EModules.ENTERPRISE,
  })
  @UseInterceptors(FileInterceptor('logo'))
  update(
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return this.enterprisesService.update(updateEnterpriseDto, logo);
  }
}
