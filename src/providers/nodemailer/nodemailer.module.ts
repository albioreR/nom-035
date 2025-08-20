import { Module } from '@nestjs/common';

import { NodemailerService } from './services';

@Module({
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
