import { ISendEmail } from '@/providers';

export class UserCreatedEmailEvent<T> {
  constructor(public readonly payload: ISendEmail<T>) {}
}
