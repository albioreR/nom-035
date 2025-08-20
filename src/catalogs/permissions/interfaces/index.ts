import { Permissions } from '@prisma/client';

import { TOmitPropControl } from '@/config';

export type TPermissionsNotPropControls = Omit<
  Permissions,
  TOmitPropControl | 'description'
>;
