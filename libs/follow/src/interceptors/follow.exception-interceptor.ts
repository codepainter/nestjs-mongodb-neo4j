import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, Observable, throwError } from 'rxjs';

import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { DuplicateFollowException } from '../exceptions/follow.exceptions';

@Injectable()
export class FollowErrorInterceptor implements NestInterceptor {
  constructor(
    @InjectPinoLogger(FollowErrorInterceptor.name)
    private readonly logger: PinoLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.debug(
          { handlerName: context.getHandler().name, error },
          'Follow Error Intercepted',
        );

        switch (error.constructor) {
          case DuplicateFollowException:
            return throwError(() => new ConflictException(error.toJSON()));

          default:
            return throwError(() => error);
        }
      }),
    );
  }
}
