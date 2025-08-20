import { Cities } from '@prisma/client';

import { TFieldsCatalog } from '@/catalogs/catalogs/interfaces';

export type TCitiesCatalog = TFieldsCatalog<Cities>;

export interface ICitiesCatalog {
  cities: TCitiesCatalog[];
}
