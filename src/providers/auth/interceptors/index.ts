import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { timeLeft } from '../constants';

@Injectable()
export class RenewJwtInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization.split('Bearer ')[1];

    const decoded = this.jwtService.verify(token);

    const currentTime = Math.floor(Date.now() / 1000);

    const expirationTime = decoded.exp;

    const timeLeftJwt = expirationTime - currentTime;

    if (timeLeftJwt < timeLeft) {
      token = this.jwtService.sign({
        id: decoded.id,
        email: decoded.email,
      });
    }

    request.body.token = token;

    return next.handle();
  }
}
