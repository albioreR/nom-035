import { Modules } from '@prisma/client';

import { TOmitPropControl } from '@/config';

export type TModulesNotPropControls = Omit<Modules, TOmitPropControl>;
