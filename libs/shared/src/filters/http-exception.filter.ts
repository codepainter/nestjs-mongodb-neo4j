import { ExpressResponse } from '@app/logger/interfaces/logger.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { ErrorResult, ErrorResultProps } from '../results/error-result.base';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ErrorResultProps;

    response.status(status).send(
      new ErrorResult({
        code: exceptionResponse.code,
        message: exceptionResponse.message,
        error: exceptionResponse.error,
        metadata: exceptionResponse.metadata,
      }),
    );
  }
}
