import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/config';

import { citiesMessages } from '../messages';

@Injectable()
export class CitiesPrismaService {
  constructor(private prisma: PrismaService) {}

  async validateIdCity(id: number): Promise<void> {
    const city = await this.prisma.cities.findUnique({
      where: {
        id,
      },
    });

    if (!city) {
      throw new ConflictException(citiesMessages.notFound);
    }
  }
}
