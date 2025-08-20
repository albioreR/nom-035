import { Roles } from '@prisma/client';

import { TOmitPropControl } from '@/config';

export type TRolesNotPropControls = Omit<
  Roles,
  TOmitPropControl | 'description'
>;

export interface IRoles {
  name: string;
  description: string;
}
