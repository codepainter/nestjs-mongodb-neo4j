import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, Observable, throwError } from 'rxjs';

import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

import {
  EmailOrPhoneRequiredException,
  InvalidPasswordException,
  JwtAuthGuardException,
  JwtInvalidatedException,
} from './auth.error';

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
          case EmailOrPhoneRequiredException:
            return throwError(() => new BadRequestException(error.toJSON()));
          case InvalidPasswordException:
          case JwtAuthGuardException:
          case JwtInvalidatedException:
            return throwError(() => new UnauthorizedException(error.toJSON()));

          default:
            return throwError(() => error);
        }
      }),
    );
  }
}
