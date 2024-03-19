import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, Observable, throwError } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthUnauthorizedException } from '../exceptions/auth.exception';

@Injectable()
export class AuthErrorInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(AuthErrorInterceptor.name)
    private readonly logger: PinoLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.debug(
          { handlerName: context.getHandler().name, error },
          'Auth Error Intercepted',
        );

        switch (error.constructor) {
          case AuthUnauthorizedException:
            return throwError(() => new UnauthorizedException(error.toJSON()));

          default:
            return throwError(() => error);
        }
      }),
    );
  }
}
