import { apiMessages } from '@/config/api';

export interface IExceptionsMessages {
  'Forbidden resource': string;
  Unauthorized: string;
}

export const exceptionsMessages = {
  'Forbidden resource': apiMessages.notPermission,
  Unauthorized: apiMessages.unauthorized,
};
