import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { CitiesPrismaService } from './services';

@Module({
  exports: [CitiesPrismaService],
  providers: [CitiesPrismaService],
  imports: [PrismaModule],
})
export class CitiesModule {}
