import { Module } from '@nestjs/common';

import { XlsxService } from './services';

@Module({
  providers: [XlsxService],
  exports: [XlsxService],
})
export class XlsxModule {}
