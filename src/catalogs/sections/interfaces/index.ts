import { Questions, Sections } from '@prisma/client';

import { TFieldsCatalog } from '@/catalogs/catalogs/interfaces';

export type TSectionCatalog = TFieldsCatalog<Sections>;

export type TQuestionCatalog = TFieldsCatalog<Questions>;

export interface IQuestionsCatalog {
  questions: TQuestionCatalog[];
}
