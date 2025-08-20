import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { SectionsPrismaService } from './services';

@Module({
  providers: [SectionsPrismaService],
  exports: [SectionsPrismaService],
  imports: [PrismaModule],
})
export class SectionsModule {}
