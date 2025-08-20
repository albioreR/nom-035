import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { getPaginationFields } from '../utils';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { page, results } = request.query;

    const { skip, take } = getPaginationFields({ page, results });

    request.query.skip = skip;
    request.query.take = take;

    delete request.query.page;
    delete request.query.results;

    return next.handle();
  }
}
