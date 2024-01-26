import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, Observable, throwError } from 'rxjs';

import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';

import {
  DuplicateKeyException,
  UserNotFoundException,
} from '../errors/user.errors';

@Injectable()
export class UserErrorInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(UserErrorInterceptor.name)
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
          case UserNotFoundException:
            return throwError(() => new NotFoundException(error.toJSON()));
          case DuplicateKeyException:
            return throwError(() => new ConflictException(error.toJSON()));

          default:
            return throwError(() => error);
        }
      }),
    );
  }
}
