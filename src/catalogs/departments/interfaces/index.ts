import { Departments } from '@prisma/client';

import { TFieldsCatalog } from '@/catalogs/catalogs/interfaces';

export type TDepartmentsCatalog = TFieldsCatalog<Departments>;
