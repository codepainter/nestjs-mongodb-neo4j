import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

export interface Response<T> {
  code: number;
  message: string;
  data: T;
  metadata?: object;
  error?: object;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(({ code, message, data, metadata, error }) => ({
        code,
        message,
        data,
        metadata,
        error,
      })),
    );
  }
}
