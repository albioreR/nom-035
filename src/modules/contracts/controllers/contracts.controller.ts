/* eslint-disable no-undef */
import {
  Body,
  HttpStatus,
  ParseFilePipeBuilder,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  apiConsumes,
  apiMethods,
  GuardSwagger,
  IdDto,
  IdEnterpriseFindAllDto,
  Swagger,
} from '@/config';

import { CreateContractsDto } from '../dtos';
import { ContractsService } from '../services';

@GuardSwagger({
  tag: 'contracts',
})
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Swagger({
    restApi: apiMethods.post,
    apiConsumes: apiConsumes.multipart,
  })
  @UseInterceptors(FileInterceptor('contract'))
  create(
    @Body() createContractsDto: CreateContractsDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'pdf' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    contract: Express.Multer.File,
  ) {
    return this.contractsService.create(createContractsDto, contract);
  }

  @Swagger({
    restApi: apiMethods.patch,
    apiConsumes: apiConsumes.multipart,
  })
  @UseInterceptors(FileInterceptor('contract'))
  update(
    @Body() updateContractDto: CreateContractsDto & IdDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'pdf' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    contract: Express.Multer.File,
  ) {
    return this.contractsService.update(updateContractDto, contract);
  }

  @Swagger({
    restApi: apiMethods.delete,
    apiConsumes: apiConsumes.multipart,
  })
  remove(@Body() idDto: IdDto) {
    return this.contractsService.remove(idDto);
  }

  @Swagger({
    restApi: apiMethods.get,
    apiConsumes: apiConsumes.multipart,
    hadPagination: true,
  })
  findAll(@Query() idEnterpriseFindAllDto: IdEnterpriseFindAllDto) {
    return this.contractsService.findAll(idEnterpriseFindAllDto);
  }
}
